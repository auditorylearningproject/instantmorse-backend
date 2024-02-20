import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  userId: Number,
  username: String,
  password: String,
  access_token: String,
});

export interface User extends mongoose.Document {
  userId: number;
  username: string;
  password: string;
  access_token: string;
}
