import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Int32 } from 'mongodb';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<Lesson>;

@Schema()
export class Lesson {
  id: string;

  @Prop({ unique: true, required: true })
  lesson_name: string;

  @Prop({ type: [String], required: true })
  array_o_chars: string[];

  @Prop(
    raw({
      name: { type: String },
      order: { type: Int32 },
    }),
  )
  group: Record<string, any>;
}

export const UserSchema = SchemaFactory.createForClass(Lesson);
