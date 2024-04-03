import { Controller, Get } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { Lesson } from './lesson.schema';

@Controller('lesson')
export class LessonController {
  constructor(private lessonService: LessonService) {}

  @Get()
  async findAll(): Promise<Lesson[]> {
    return this.lessonService.findAll();
  }
}
