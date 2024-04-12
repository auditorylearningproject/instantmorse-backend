/* eslint-disable @typescript-eslint/no-var-requires */
import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  Header,
  HttpStatus,
  HttpException,
  Body,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LessonAttemptDto } from './attempt.dto';
import { AttemptService } from './attempt.service';
import { AuthGuard } from 'src/authentication/auth.guard';
import mongoose from 'mongoose';
import { Attempt } from './schema/attempt.schema';
import { LessonService } from '../lesson_select/lesson.service';

@Controller('attempt')
export class LessonAttemptController {
  constructor(
    private attemptService: AttemptService,
    private readonly lessonService: LessonService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  @Header('Cache-Control', 'none')
  async add_attempt(
    @Req() req,
    @Body() attemptDto: LessonAttemptDto,
  ): Promise<void> {
    try {
      req.headers['sub']; // userID
      await this.attemptService.add({
        ...attemptDto,
        lesson_id: new mongoose.Types.ObjectId(attemptDto.lesson_id),
        user_id: new mongoose.Types.ObjectId(req.user['sub'] ?? 'null'),
      });
    } catch (error) {
      throw new HttpException(
        'The lesson attempt failed to save.',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @UseGuards(AuthGuard)
  @Get('get-all')
  @Header('Cache-Control', 'none')
  async get_all_attempts(
    @Req() req,
  ): Promise<Array<Attempt & { lesson_name: string }>> {
    try {
      // const val = await this.attemptService.getAll(
      //   new mongoose.Types.ObjectId(req.user['sub'] ?? 'null'),
      // );

      const userId = new mongoose.Types.ObjectId(req.user['sub'] ?? 'null');
      const attempts = await this.attemptService.getAll(userId);

      const attemptsWithLessons = await Promise.all(
        attempts.map(async (attempt) => {
          const lesson = await this.lessonService.findById(
            attempt.lesson_id.toString(),
          );
          const lesson_name = lesson.lesson_name;
          if (lesson) {
            return {
              ...attempt,
              lesson_name: lesson_name,
            };
          } else {
            return null;
          }
        }),
      );

      return attemptsWithLessons.filter((attempt) => attempt !== null);
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve attempts.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
