import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { Authentication } from '../interfaces/authentication.interface';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
    ) { }

    async signIn(
      username: string, 
      pass: string
  ): Promise<any> {
      const user = await this.usersService.findOne(username);
      if (user?.password !== pass) {
          throw new UnauthorizedException();
      }
      const payload = { sub: user.userId, username: user.username };
      return {
          access_token: await this.jwtService.signAsync(payload),
      };
  }

  findAll(): Authentication[] {
    return;
  }

  findOne(id: number) {
    return `This action returns a #${id} authentication`;
  }

  update(id: number, updateAuthenticationDto: UpdateAuthenticationDto) {
    return `This action updates a #${id} authentication`;
  }

  remove(id: number) {
    return `This action removes a #${id} authentication`;
  }
}
