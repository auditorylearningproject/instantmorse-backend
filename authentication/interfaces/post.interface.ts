import { Document } from "mongoose";

export interface Post extends Document {
  readonly username: string;
  readonly password: string;
}
