import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { webUser, UserSchema } from './users.schema';
import { UserController } from './users.controller';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: webUser.name, schema: UserSchema }],
      'user-connect',
    ),
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UserController],
})
export class UsersModule {}
