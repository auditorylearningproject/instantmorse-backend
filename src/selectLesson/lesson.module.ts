import { Module } from '@nestjs/common';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';
import { UsersModule } from './users/users.module';

@Module({
  controllers: [LessonController],
  providers: [LessonService],
  imports: [UsersModule]
})
export class LessonModule {}
