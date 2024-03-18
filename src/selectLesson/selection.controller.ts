import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { LessonService } from './lessons/lesson.service';
import { Lesson } from './lessons/lesson.schema';

@Controller('lesson')
export class SelectionController {
  constructor(private lessonService: LessonService) {}

  @HttpCode(HttpStatus.OK)
  @Get('select')
  async selection(): Promise<Lesson[]> {
    return this.lessonService.findAll();
  }
}
