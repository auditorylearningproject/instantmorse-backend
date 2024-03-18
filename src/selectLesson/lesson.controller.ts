import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { LessonService } from './lesson.service';

@Controller('lesson')
export class LessonController {
  constructor(private lessonService: LessonService) {}

  @HttpCode(HttpStatus.OK)
  @Get('select')
  async selection() Promise<User[]>{

  }
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
