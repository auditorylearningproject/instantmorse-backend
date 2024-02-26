import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
// import * as mongoose from 'mongoose';

// export const UserSchema = new mongoose.Schema({
//   userId: Number,
//   username: String,
//   password: String,
//   access_token: String,
// });

// export interface User extends mongoose.Document {
//   userId: number;
//   username: string;
//   password: string;
//   access_token: string;
// }

// export type UserDocument = HydratedDocument<User>;

// @Schema()
// export class User extends Document {
//   @Prop({ required: true })
//   userId: number;
//   @Prop({ required: true })
//   username: string;
//   @Prop({ required: true })
//   password: string;
//   @Prop()
//   access_token: string;
//   // static username: string;
// }

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: Number,
  username: String,
  password: String,
  access_token: String
});

const User = mongoose.model('User', userSchema);


export const UserSchema = SchemaFactory.createForClass(User);
