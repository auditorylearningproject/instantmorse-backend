import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LessonController } from './lesson.controller';
import { Lesson, LessonSchema } from './lesson.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JWT_EXPIRE } from 'src/authentication/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Lesson.name, schema: LessonSchema }],
      'lessons',
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
  ],
  controllers: [LessonController],
  providers: [LessonService],
  exports: [MongooseModule, LessonService],
})
export class LessonModule {}
