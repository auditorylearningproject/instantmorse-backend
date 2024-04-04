import { Controller, Get, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common';
import { LessonService } from './lessons/lesson.service';
import { Lesson } from './lessons/lesson.schema';
import mongoose from 'mongoose';

@Controller('lesson')
export class SelectionController {
  constructor(private lessonService: LessonService) {}

  @HttpCode(HttpStatus.OK)
  @Get('select')
  async selection(): Promise<Lesson[]> {
    return this.lessonService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Post('get') // haha yes, this is confusing
  async getLessonById(lessonID: mongoose.Types.ObjectId): Promise<Lesson> {
    const foundLesson = await this.lessonService.findById(lessonID);
    if (foundLesson === null) {
      throw new HttpException(
        'No lessons found with that ID',
        HttpStatus.NOT_FOUND,
      );
    } else {
      return foundLesson;
    }
  }
}
