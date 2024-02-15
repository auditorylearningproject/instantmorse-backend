import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  HttpCode,
  Header,
  Redirect,
  HttpStatus,
  UseGuards,
} from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { signInDto } from "./dto/createUser.dto";
import { UsersService } from "./users/users.service";
import { Request } from "express";
import { Authentication } from "./interfaces/authentication.interface";
import { AuthenticationGuard } from "./authentication.guard";
import { userInfo } from "os";

@Controller("authentication") //means it looks in the folder /authentication
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}
  @HttpCode(HttpStatus.OK)
  @Post("login")
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authenticationService.signIn(signInDto.username, signInDto.password);
  }
  // async submit(@Body() username: string, password: string) {
  //   try {
  //     UsersService.findOne(username, password);
  //     console.log("Success");
  //     return { message: "Success" };
  //   } catch (error) {
  //     console.log("Error")
  //     throw new Error("Error happened");
  //   }
  // }
  
    // @Get() //maps GET/authentication - gets information
    // @Redirect("static/auth", 301) //sample redirection - can redirect back to the authentication page if the user or pass is wrong
    // async findAll(@Req() request: Request): Promise<Authentication[]> {
    //   return this.authenticationService.findAll(); //overrides Redirect if findAll is true
    // }
  
    @UseGuards(AuthenticationGuard)
    @Get("profile")
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
