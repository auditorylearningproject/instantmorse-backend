import { Module } from '@nestjs/common';
import { SelectionController } from './selection.controller';
import { SelectionService } from './selection.service';
import { LessonModule } from './lessons/lesson.module';

@Module({
  controllers: [SelectionController],
  providers: [SelectionService],
  imports: [LessonModule],
})
export class SelectionModule {}
