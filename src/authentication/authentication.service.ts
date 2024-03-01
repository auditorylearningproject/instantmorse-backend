import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
// import { Authentication } from './interfaces/authentication.interface';
import { UsersService } from './users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './users/dto/create-user.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findByUsername(username); //finds the username
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload), //generates JWT
    };
  }

  async register(
    username: string,
    password: string,
  ): Promise<{ username: string }> {
    const user = await this.usersService.register(username, password); //finds the username
    return user;
  }

  // async create() {
  //   const user = await this.usersService.create(CreateUserDto); //finds the username
  //   return user;
  // }

  // findAll(): Authentication[] {
  //   return;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} authentication`;
  // }

  // update(id: number, updateAuthenticationDto: UpdateAuthenticationDto) {
  //   return `This action updates a #${id} authentication`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} authentication`;
  // }
  // }
}
