import { Body, Controller, Get, Post } from '@nestjs/common';
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
    this.usersService.register(createUserDto.username, createUserDto.password);
    return 'Create success!';
  }
}
