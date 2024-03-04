import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './user.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: User.name, schema: UserSchema }],
      'users',
    ),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [MongooseModule, UserService],
})
export class UserModule {}
