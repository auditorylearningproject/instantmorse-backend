import { ObjectId } from 'mongoose';
export class LessonAttemptDto {
  //_id: ObjectId; // MongoDB ObjectId
  lesson_id: string; // convert this eventually to a MongoDB ObjectId
  //user_id: ObjectId; // MongoDB ObjectId
  char_speed: number;
  eff_speed: number;
  accuracy: number;
  time_spent: number;
  date_time: Date;
}
