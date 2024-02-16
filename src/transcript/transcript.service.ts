import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import * as fs from 'fs';
import { Observable, catchError, map } from 'rxjs';
//import { Cat } from './interfaces/cat.interface';

@Injectable()
export class TranscribeService {
  readonly lang = 'en-US';
  speechRecognizer: SpeechRecognizer;

  async transcribe(stream: fs.ReadStream): Promise<string> {
    const recording = await streamToBlob(stream, 'audio/flac'); //used to be "audio/ogg; codecs=opus" OR WEBM
    try {
      const result = await this.speechRecognizer.recognize_google(
        recording,
        null,
        this.lang,
        0,
        false,
        true,
      );
      console.log('Recognition result:', result);
      return result as string;
    } catch (error) {
      // Handle any errors that occur during recognition
      console.error('Recognition error:', error);
      return 'text';
    }
  }
  constructor() {
    this.speechRecognizer = new SpeechRecognizer();
  }
  // private readonly cats: Cat[] = [];

  //  constructor(private readonly httpService: HttpService) {}

  //   async sendStreamToEndpoint(stream: fs.ReadStream): Promise<Observable<Object>> {
  // const apiUrl =
  //   'http://www.google.com/speech-api/v2/recognize?client=chromium&lang=en-US&key=AIzaSyBOti4mM-6x9WDnZIjIeyEU21OpBXqWBgw';

  // try {
  //     const response = await this.httpService.post<typeof Object>(apiUrl, stream, {
  //         headers: {
  //             'Content-Type': 'audio/x-flac; rate=64000',
  //             'User-Agent':
  //             'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.1 Safari/537.36',
  //         },
  //         responseType: 'stream', // specify that you expect a stream in response
  //         });

  //   // Assuming the API response contains the input stream as a response, you can save it to a variable
  //     const inputStream: Observable<Object> = response.pipe(
  //   map((axiosResponse: AxiosResponse) => {
  //     return axiosResponse.data;
  //   }),         catchError((error: AxiosError) => {
  //     console.error(error.response.data);
  //     throw 'An error happened!';
  //   })); // Adjust this based on the actual response structure
  //   console.log('Stream sent successfully');

  //  return inputStream;
  //     try{

  //     } catch (error) {
  //       console.error('Error sending stream to the endpoint:', error.message);
  //     }
  //   }
}

class SpeechRecognizer {
  energy_threshold: number;
  dynamic_energy_threshold: boolean;
  dynamic_energy_adjustment_damping: number;
  dynamic_energy_ratio: number;
  pause_threshold: number;
  operation_timeout: number | null;
  phrase_threshold: number;
  non_speaking_duration: number;

  constructor() {
    this.energy_threshold = 300;
    this.dynamic_energy_threshold = true;
    this.dynamic_energy_adjustment_damping = 0.15;
    this.dynamic_energy_ratio = 1.5;
    this.pause_threshold = 0.8;
    this.operation_timeout = null;
    this.phrase_threshold = 0.3;
    this.non_speaking_duration = 0.5;
  }

  async recognize_google(
    audio_data: Blob,
    key: string | null = null,
    language: string = 'en-US',
    pfilter: number = 0,
    show_all: boolean = false,
    with_confidence: boolean = false,
  ): Promise<string | { transcript: string; confidence: number } | null> {
    if (!(audio_data instanceof Blob)) {
      throw new Error('audio_data must be audio data');
    }
    if (key !== null && typeof key !== 'string') {
      throw new Error('key must be null or a string');
    }
    if (typeof language !== 'string') {
      throw new Error('language must be a string');
    }

    //   const flac_data = audio_data.get_flac_data({
    //     convert_rate: audio_data.sample_rate >= 8000 ? null : 8000, // audio samples must be at least 8 kHz
    //     convert_width: 2, // audio samples must be 16-bit
    //   });

    if (key === null) {
      key = 'AIzaSyBOti4mM-6x9WDnZIjIeyEU21OpBXqWBgw';
    }

    const url = `http://www.google.com/speech-api/v2/recognize?${new URLSearchParams(
      {
        client: 'chromium',
        lang: language,
        key: key,
        pFilter: pfilter.toString(),
      },
    )}`;
    console.log(audio_data.type);
    const headers = { 'Content-Type': `audio/x-flac; rate=48000` }; //${audio_data.type.split(" ")[0]
    const request = new Request(url, {
      method: 'POST',
      body: audio_data,
      headers,
    });

    try {
      const response = await fetch(request, {
        ...(this.operation_timeout !== null && {
          signal: AbortSignal.timeout(this.operation_timeout),
        }),
      }); //research "spread operator"
      const response_text = await response.text();
      console.log(response_text);
      // ignore any blank blocks
      let actual_result: any = null;
      for (const line of response_text.split('\n')) {
        if (!line) continue;
        const result = JSON.parse(line).result;
        if (result.length !== 0) {
          actual_result = result[0];
          break;
        }
      }

      // return results
      if (show_all) {
        return actual_result;
      }

      if (
        !actual_result ||
        !actual_result.alternative ||
        actual_result.alternative.length === 0
      ) {
        console.log("We couldn't hear anything!");
        throw new Error('UnknownValueError');
      }

      const best_hypothesis =
        'confidence' in actual_result
          ? actual_result.alternative.reduce((prev: any, current: any) =>
              prev.confidence > current.confidence ? prev : current,
            )
          : actual_result.alternative[0];

      if (!best_hypothesis.transcript) {
        throw new Error('UnknownValueError');
      }

      const confidence = best_hypothesis.confidence || 0.5;

      if (with_confidence) {
        return { transcript: best_hypothesis.transcript, confidence };
      }

      return best_hypothesis.transcript;
    } catch (e) {
      if (e instanceof Error) {
        if (e.name === 'AbortError') {
          throw new Error('Recognition request failed: Timeout');
        }
        throw new Error(`Recognition request failed: ${e.message}`);
      }
      throw new Error('Recognition request failed');
    }
  }
}

function streamToBlob(stream, mimeType): Promise<Blob> {
  if (mimeType != null && typeof mimeType !== 'string') {
    throw new Error('Invalid mimetype, expected string.');
  }
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream
      .on('data', (chunk) => chunks.push(chunk))
      .once('end', () => {
        const blob =
          mimeType != null
            ? new Blob(chunks, { type: mimeType })
            : new Blob(chunks);
        resolve(blob);
      })
      .once('error', reject);
  });
}
