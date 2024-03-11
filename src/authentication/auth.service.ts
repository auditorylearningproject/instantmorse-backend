import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
//import { CreateUserDto } from '../users/create-user.dto';
import TokenInterface from './token.interface';
//import { User } from '../users/user.schema';
//import { AuthModule } from './auth.module';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, //forwardRef?
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<{ token: string; expiresIn: number }> {
    const user = await this.usersService.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Invalid username or password (psst... it\'s the username).'); // username doesn't exist
    }

    const match = await bcrypt.compare(password, user.password_hashed);
    if (!match) {
      throw new UnauthorizedException('Invalid username or password (psst... it\'s the password).'); //password doesn't match
    }

    //const { password_hashed, ...result } = user;

    const payload = { sub: user.id, username: user.username };
    const date = new Date(); // Now
    date.setDate(date.getDate() + 30);

    return {
      token: await this.jwtService.signAsync(payload), //generates JWT
      expiresIn: date.getTime() / 1000,
    };
  }

  public createCookie(tokenData: TokenInterface) {
    return {
      Authorization: 'Bearer ' + tokenData.token,
      HttpOnly: '',
      'Max-Age': tokenData.expiresIn,
    };
  }
}
