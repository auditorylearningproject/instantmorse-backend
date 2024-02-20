import { Injectable, UnauthorizedException } from '@nestjs/common';
import { signInDto } from './dto/createUser.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { Authentication } from './interfaces/authentication.interface';
import { UsersService } from './users/users.service';
import { JwtService } from '@nestjs/jwt';

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
      //if the username is found, checks the password
      throw new UnauthorizedException();
    } else if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload), //generates JWT
    };
  }

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
}
