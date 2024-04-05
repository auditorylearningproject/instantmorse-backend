import { Injectable } from '@nestjs/common';
import { Lesson } from './lesson.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class LessonService {
  constructor(
    @InjectModel(Lesson.name, 'lessons') private lessonModel: Model<Lesson>,
  ) {}

  async findAll(): Promise<Lesson[]> {
    return this.lessonModel.find().exec();
  }

  async findById(lessonID: string): Promise<Lesson | null> {
 
    const result = await this.lessonModel
      .findById(new mongoose.Types.ObjectId(lessonID))
      .exec();
    if(!result){
      return null;
    }else{
      return result;
    }
  }
}
