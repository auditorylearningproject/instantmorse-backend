import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import { Lesson } from './lesson.schema';
// import mongoose from 'mongoose';

@Controller('lesson')
export class LessonController {
  constructor(private lessonService: LessonService) {}

  @HttpCode(HttpStatus.OK)
  @Get('select')
  async selection(): Promise<Lesson[]> {
    try {
      const lesson = await this.lessonService.findAll();
      if (lesson === null) {
        throw new HttpException('No lessons found', HttpStatus.NOT_FOUND);
      } else {
        return lesson;
      }
    } catch (error) {
      console.log(error);
      throw new HttpException('MongoDB error occurred.', HttpStatus.NOT_FOUND);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('get') // haha yes, this is confusing
  async getLessonById(@Body() body: { lessonID: string }): Promise<Lesson> {
    try {
      const foundLesson = await this.lessonService.findById(body.lessonID);
      if (foundLesson === null) {
        throw new HttpException(
          'No lessons found with that ID',
          HttpStatus.NOT_FOUND,
        );
      } else {
        return foundLesson;
      }
    } catch (error) {
      console.log(error);
      throw new HttpException('MongoDB error occurred.', HttpStatus.NOT_FOUND);
    }
  }
}
