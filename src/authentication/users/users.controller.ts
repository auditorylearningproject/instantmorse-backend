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
import { CWSettingsService } from 'src/cw_settings/settings.service';
import mongoose from 'mongoose';
import { AssertionError } from 'assert';

@Controller('user')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private settingsService: CWSettingsService,
  ) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.usersService.register(
        createUserDto.username,
        createUserDto.password,
      );
      this.settingsService.createSettings(
        new mongoose.Types.ObjectId(newUser.id),
      );
    } catch (exc) {
      if (exc instanceof NotFoundException) {
        throw new HttpException('Username already taken or settings create fail', HttpStatus.CONFLICT);
      } else if (exc instanceof AssertionError){
        throw new HttpException('Default settings create failed for user.', HttpStatus.CONFLICT);
      } else {
        throw new Error(exc);
      }
    }
    return 'Create success!';
  }
}
