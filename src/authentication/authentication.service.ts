import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { signInDto } from './dto/createUser.dto';
// import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
// import { Authentication } from './interfaces/authentication.interface';
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
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.username };
    await this.usersService.updateToken(
      username,
      await this.jwtService.signAsync(payload),
    );
    return {
      access_token: await this.jwtService.signAsync(payload), //generates JWT
    };
  }

  // async accessCheck(
  //   username: string,
  //   access_token: string,
  // ): Promise<{ access_token: string }> {

  // }

  // async tokenRegister(
  //   username: string,
  //   access_token: string,
  // ): Promise<{ access_token: string }> {
  //   const token = await this.usersService.updateToken(username, access_token);
  //   if (token?.access_token !== access_token) {
  //     throw new UnauthorizedException();
  //   }
  //   const user = await this.usersService.findByUsername(username);
  //   const payload = { sub: user.userId, username: user.username };
  //   return {
  //     access_token: await this.jwtService.signAsync(payload),
  //   };
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
