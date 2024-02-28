import {
  Controller,
  Get,
  Post,
  // Body,
  // Patch,
  // Param,
  // Delete,
  Req,
  HttpCode,
  // Header,
  // Redirect,
  HttpStatus,
  UseGuards,
  Body,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
// import { SignInDto } from './dto/signIn.dto';
// import { UsersService } from './users/users.service';
// import { Request } from 'express';
// import { Authentication } from './interfaces/authentication.interface';
import { AuthenticationGuard } from './authentication.guard';
// import { userInfo } from 'os';
// import { User } from './users/users.schema';

@Controller('authentication') //means it looks in the folder /authentication
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() req: string | any) {
    return this.authenticationService.signIn(req.username, req.password);
  }

  // @Get() //maps GET/authentication - gets information
  // @Redirect("static/auth", 301) //sample redirection - can redirect back to the authentication page if the user or pass is wrong
  // async findAll(@Req() request: Request): Promise<Authentication[]> {
  //   return this.authenticationService.findAll(); //overrides Redirect if findAll is true
  // }

  @UseGuards(AuthenticationGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

  // @Get(":id") //gets a specific object or type from the stored info
  // findOne(@Param("id") id: number): string {
  //   console.log(id);
  //   return this.authenticationService.findOne(id);
  // }

  // @Patch(":id")
  // update(
  //   @Param("id") id: string,
  //   @Body() updateAuthenticationDto: UpdateAuthenticationDto,
  // ) {
  //   return this.authenticationService.update(+id, updateAuthenticationDto);
  // }

  // @Delete(":id")
  // remove(@Param("id") id: string) {
  //   return this.authenticationService.remove(+id);
  // }
}
