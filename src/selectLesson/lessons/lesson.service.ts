import { Injectable } from '@nestjs/common';

@Injectable()
export class LessonService {
  findAll():
    | import('./lesson.schema').Lesson[]
    | PromiseLike<import('./lesson.schema').Lesson[]> {
    throw new Error('Method not implemented.');
  }
}
