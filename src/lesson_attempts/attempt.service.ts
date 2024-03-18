import mongoose, { Error, Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Attempt } from './schema/attempt.schema';
import { LessonAttemptDto } from './attempt.dto';

@Injectable()
export class AttemptService {
  constructor(
    @InjectModel(Attempt.name, 'statistics')
    private attemptModel: Model<Attempt>,
  ) {}

  async add(attemptDto: object) {
    const addedAttempt = new this.attemptModel(attemptDto);
    // try {

    console.log(attemptDto);
    await addedAttempt.save().catch((reason) => {
      console.error(reason);
      throw new HttpException(
        'Failed to save',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    });
    // } catch (exception) {
    //   console.log(exception);
    // }
  }

  async getAll(userId: mongoose.Types.ObjectId): Promise<Attempt[]> {
    return this.attemptModel
      .find(
        {
          user_id: userId,
        },
        { _id: 0, __v: 0 },
      )
      .exec();
  }
}
