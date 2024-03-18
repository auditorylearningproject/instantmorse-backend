import { Injectable } from '@nestjs/common';
import { Lesson } from './lesson.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class LessonService {
  constructor(
    @InjectModel(Lesson.name, 'data') private lessonModel: Model<Lesson>, //adding the database name here fixed the issues with injection!
  ) {}

  async findAll(): Promise<Lesson[]> {
    return this.lessonModel.find().exec();
  }
}
