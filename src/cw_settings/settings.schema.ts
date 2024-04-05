import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { HydratedDocument } from 'mongoose';

export type CWSettingsDocument = HydratedDocument<CWSettings>;

@Schema({ collection: 'userprefs' })
export class CWSettings {
  // _id: string;

  @Prop({ type: ObjectId, required: true })
  user_id: ObjectId;
//   @Prop({ type: ObjectId, ref: 'User', required: true })
//   user_id: User;

  @Prop({ required: true })
  char_speed: number;

  @Prop({ required: true })
  effective_speed_wpm: number;

  @Prop({ required: true, min: 0, max: 1000 })
  playback_tone_hz: number;

  @Prop({ required: true })
  session_length: number;

}

export const CWSettingsSchema = SchemaFactory.createForClass(CWSettings);
