import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.schema';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      await this.usersService.register(
        createUserDto.username,
        createUserDto.password,
      );
    } catch (exc) {
      if (exc instanceof NotFoundException) {
        throw new HttpException('Username already taken', HttpStatus.CONFLICT);
      } else {
        throw new Error(exc);
      }
    }
    return 'Create success!';
  }
}
