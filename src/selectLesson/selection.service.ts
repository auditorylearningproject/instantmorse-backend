import { Injectable } from '@nestjs/common';
import { LessonService } from './lessons/lesson.service';

@Injectable()
export class SelectionService {
  constructor(private lessonService: LessonService) {}
}
