import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LessonDocument = HydratedDocument<Lesson>;

@Schema({ collection: 'data' })
export class Lesson {
  id: string;

  @Prop({ unique: true, required: true })
  lesson_name: string;

  @Prop({ type: [String], required: true })
  array_o_chars: string[];

  @Prop(
    raw({
      name: { type: String },
      order: { type: Number },
    }),
  )
  group: Record<string, any>;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
