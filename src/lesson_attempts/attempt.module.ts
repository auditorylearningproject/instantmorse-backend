import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LessonAttemptController } from './attempt.controller';
import { AttemptService } from './attempt.service';
import { Attempt, AttemptSchema } from './schema/attempt.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JWT_EXPIRE } from 'src/authentication/auth.module';
import { LessonModule } from 'src/lesson_select/lesson.module';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Attempt.name, schema: AttemptSchema }],
      'statistics',
    ),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        global: true,
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: JWT_EXPIRE },
      }),
    }),
    LessonModule,
  ],
  controllers: [LessonAttemptController],
  providers: [AttemptService],
  exports: [MongooseModule, AttemptService],
})
export class AttemptModule {}
