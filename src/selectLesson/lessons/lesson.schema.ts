import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<Lesson>;

@Schema()
export class Lesson {
  id: string;

  @Prop({ unique: true, required: true })
  lesson_name: string;

  @Prop({ required: true })
  array_o_chars: string[];

  @Prop({ required: true })
  group: object;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
