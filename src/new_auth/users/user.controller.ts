import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UserService } from './user.service';
import { User } from './user.schema';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    this.userService.signUp(createUserDto.username, createUserDto.password);
    return 'Create success!';
  }
}
