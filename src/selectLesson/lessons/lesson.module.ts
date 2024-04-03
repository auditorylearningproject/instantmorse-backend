import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.contoller';

@Module({
  providers: [LessonService],
  exports: [LessonService],
  controllers: [LessonController],
})
export class LessonModule {}
