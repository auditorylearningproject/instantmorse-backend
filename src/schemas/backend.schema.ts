import * as mongoose from 'mongoose';

export const authSchema = new mongoose.Schema({
    username: String,
    password: String
})