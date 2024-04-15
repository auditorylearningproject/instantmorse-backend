import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  UseFilters,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './signin-auth.dto';
import { LoginExceptionFilter } from './login-exception.filter';
import { AuthGuard } from './auth.guard';
import { Response } from 'express';
import TokenInterface from './token.interface';

@Controller('authentication')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UseFilters(new LoginExceptionFilter())
  async signIn(
    @Body() signInDto: SigninDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const jwt_token = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
    const cookie = this.authService.createCookie(jwt_token as TokenInterface);
    //for (const [key, value] of Object.entries(cookie)) {
    // Set the cookie using response.cookie
    response.cookie('Authorization', cookie.Authorization, {
      maxAge: cookie['Max-Age'],
      sameSite: cookie['SameSite'] === 'none' ? 'none' : 'lax',
      secure: cookie['Secure'],
      encode: (v) => v, //prevents URL encode making spaces into %20
    });
    //}
    //redirect?
  }

  @Get('login')
  randFunc() {
    return "You shouldn't be here!";
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    // we have the JWT, so get the username from it
    console.log(req.user['username']);
    console.log(req.user['sub']);
    return req.user; // contains 'sub' (userID), username, and 'exp' (expiration date)
  }
}
