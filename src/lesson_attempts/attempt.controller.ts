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

@Controller('attempt')
export class LessonAttemptController {
  constructor(private attemptService: AttemptService) {}

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
  async get_all_attempts(@Req() req): Promise<Attempt[]> {
    try {
      const val = await this.attemptService.getAll(
        new mongoose.Types.ObjectId(req.user['sub'] ?? 'null'),
      );
      return val;
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve attempts.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
