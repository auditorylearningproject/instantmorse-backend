import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { HydratedDocument } from 'mongoose';
import { User } from 'src/authentication/users/user.schema';

export type AttemptDocument = HydratedDocument<Attempt>;

@Schema() //this defines the collection name as the class name + "s", so "attempts"
export class Attempt { 
  _id: string;

  @Prop({ type: ObjectId, required: true })
  lesson_id: ObjectId;

  @Prop({ type: ObjectId, ref: 'User', required: true })
  user_id: User;

  @Prop({ required: true })
  char_speed: number;

  @Prop({ required: true })
  eff_speed: number;

  @Prop({ required: true, min: 0, max: 100 })
  accuracy: number;

  @Prop({ required: true })
  time_spent: number;

  @Prop({ required: true })
  date_time: Date;
}

export const AttemptSchema = SchemaFactory.createForClass(Attempt);
