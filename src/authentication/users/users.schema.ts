import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';

export type UserDocument = HydratedDocument<webUser>;

@Schema()
export class webUser extends Document {
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

export const UserSchema = SchemaFactory.createForClass(webUser);
