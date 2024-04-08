import mongoose from 'mongoose';

export interface CWSettings {
  user_id: mongoose.Types.ObjectId; // MongoDB ObjectId stored as a string
  char_speed: number;
  effective_speed_wpm: number;
  playback_tone_hz: number;
  session_length: number;
}
