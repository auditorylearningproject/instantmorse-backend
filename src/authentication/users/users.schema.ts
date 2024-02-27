import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  userId: number;
  @Prop({ required: true })
  username: string;
  @Prop({ required: true })
  password: string;
  @Prop()
  access_token: string;
  // static username: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
