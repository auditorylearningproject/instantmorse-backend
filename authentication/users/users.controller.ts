import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { UsersService } from "./users.service"; // Import your user service
import { User } from "./users.service"; // Assuming User interface is defined
import { CreateUserDto } from "./dto/create-user.dto";

@Controller("users") // Base route for this controller
export class UserController {
  constructor(private readonly userService: UsersService) {} // Inject user service

  // @Get()
  // findAll(): Promise<User[]> {
  //   // GET endpoint to fetch all users
  //   return this.userService.findAll();
  // }

  // @Get(":id")
  // findOne(@Param("id") id: string): Promise<User> {
  //   // GET endpoint to fetch a single user by ID
  //   return this.userService.findOne(id);
  // }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto): Promise<User> { // POST endpoint to create a new user
  //     return this.userService.create(createUserDto);
  // }

  @Post()
  async submit(@Body() username: string, password: string) {
    try {
      await this.userService.findOne(username, password);
      console.log("Success");
      return { message: "Success" };
    } catch (error) {
      console.log("Error")
      throw new Error("Error happened");
    }
  }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> { // PUT endpoint to update an existing user
  //     return this.userService.update(id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string): Promise<void> { // DELETE endpoint to delete a user by ID
  //     return this.userService.remove(id);
  // }
}
