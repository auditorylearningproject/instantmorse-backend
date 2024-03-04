import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  id: string;

  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ required: true })
  password_hashed: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
