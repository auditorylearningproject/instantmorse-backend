/* eslint-disable @typescript-eslint/no-var-requires */
import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  Header,
  HttpStatus,
  UploadedFile,
  UseInterceptors,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { TranscribeRequestDto } from './transcribe.dto';
import { Readable } from 'stream';
import { PassThrough, Writable } from 'stream';
import { TranscribeService } from './transcript.service';
import * as fs from 'fs';
import { FileInterceptor } from '@nestjs/platform-express';
const streamifier = require('streamifier');
const FfmpegCommand = require('fluent-ffmpeg');

@Controller('transcribe')
export class TranscriptController {
  @Post()
  @Header('Cache-Control', 'none')
  // @UseInterceptors(AnyFilesInterceptor())
  @UseInterceptors(FileInterceptor('file'))
  async transcribe(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<
    | string
    | { transcript: string; confidence: number }
    | [{ transcript: string; confidence: number }]
  > {
    //@UploadedFiles() files: Array<Express.Multer.File>,
    try {
      //    const bufferStream = new PassThrough();
      // const outStream = new Writable({
      //     write(chunk, encoding, callback) {
      //       // Pass the chunk to the bufferStream
      //     //   bufferStream.write(chunk, encoding, callback);
      //     },
      //   });
      // outStream.on('finish', () => {
      //     console.log('outStream finished writing');
      //     const processedData = Buffer.concat(outputBuffer);

      //     // End the bufferStream to signify the end of data
      //     // bufferStream.end();

      //   });
      const contentType = req.get('Audio-Type');

      // Check if the request has a valid content type
      if (!contentType) {
        res.status(HttpStatus.BAD_REQUEST);
        return 'Error';
      }

      // Get binary data from the request body
      //const audioBuffer: Buffer = Buffer.from(req.body, 'binary');
      const outputBuffer: Buffer[] = [];

      // Check if the audio file is not empty
      if (file.size === 0) {
        res.status(HttpStatus.UNPROCESSABLE_ENTITY);
        return 'Error';
      }

      const bufferStream = new Readable();
      bufferStream.push(file.buffer);
      bufferStream.push(null); // Signal the end of the stream

      console.log('Buffer Length:', file.buffer.length);
      console.log('Content Type:', contentType);

      console.log(contentType);
      const command = new FfmpegCommand()
        .input(bufferStream)
        .inputFormat(contentType)
        .audioFrequency(48000)
        .audioChannels(1)
        .outputFormat('flac')
        .audioCodec('flac');

      //command.pipe(outStream, { end: true });
      // command.on('data', (chunk: Buffer) => {
      //     // Collect the output in an in-memory buffer
      //     outputBuffer.push(chunk);
      // });

      /*
            command.on('end', () => {
                // Combine chunks into a single Buffer
                const processedData = Buffer.concat(outputBuffer);
                let trancriber = new TranscribeService()


                trancriber.transcribe(streamifier.createReadStream(processedData)).then((finalTranscription) => {
                    res.status(HttpStatus.OK);
                    return finalTranscription; //returns this
                });
            });
            command.on('error', (err) => {
              console.error('ffmpeg error:', err);
              res.status(HttpStatus.INTERNAL_SERVER_ERROR);
              return;
          });
          */

      const ffstream = command.pipe();

      //UNCOMMENT
      ffstream.on('data', function (chunk: any) {
        if (Buffer.isBuffer(chunk)) {
          // console.log(chunk);
          outputBuffer.push(chunk);
        } else if (typeof chunk === 'string') {
          // Handle string data if necessary
        } else {
          console.error('Unexpected data type:', typeof chunk);
        }
      });

      return new Promise<
        | string
        | { transcript: string; confidence: number }
        | [{ transcript: string; confidence: number }]
      >((resolve, reject) => {
        command.on('end', () => {
          const processedData = Buffer.concat(outputBuffer);
          const trancriber = new TranscribeService();

          trancriber
            .transcribe(streamifier.createReadStream(processedData))
            .then((finalTranscription) => {
              res.status(HttpStatus.OK);
              resolve(finalTranscription);
            })
            .catch((error) => {
              // eslint-disable-next-line prettier/prettier
              if(error instanceof HttpException){
                const newErr = error as HttpException;
                res.status(newErr.getStatus()).send();
                reject(error);
              } else {
                console.error('Error processing audio file:', error);
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
                reject(error);
              }
            });
        });
      });
      // Respond with success if transcription is successful
    } catch (error) {
      console.error('Error processing audio file:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
