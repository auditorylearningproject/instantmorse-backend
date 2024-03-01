import {
  Controller,
  // Get,
  // Post,
  // Body,
  // Param,
  // Delete,
  // Put,
} from '@nestjs/common';
import { UsersService } from './users.service'; // Import your user service
// import { CreateUserDto } from './dto/create-user.dto';
// import { User } from './users.schema';
// import { CreateUserDto } from './dto/create-user.dto';

@Controller('users') // Base route for this controller
export class UserController {
  constructor(private readonly userService: UsersService) {} // Inject user service

  // @Post()
  // async create(
  //   @Body()
  //   CreateUserDto: {
  //     userId: number;
  //     username: string;
  //     password: string;
  //     access_token: string;
  //   },
  // ): Promise<User> {
  //   return this.userService.create(CreateUserDto);
  // }

  //The 'create' method here seems like it has invalid syntax.
  //      (plus, we should probably be storing userid + access_token in a separate document/table so that a user can have multiple open sessions.)

  // @Get()
  // async findAll(): Promise<Cat[]> {
  //   return this.userService.findAll();
  // }
}
// @Post("login")
// async submit(@Body() username: string) {
//   try {
//     await this.userService.findUser(username);
//     console.log("Success");
//     return { message: "Success" };
//   } catch (error) {
//     console.log("Error")
//     throw new Error("Error happened");
//   }
// }

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

// @Put(':id')
// update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> { // PUT endpoint to update an existing user
//     return this.userService.update(id, updateUserDto);
// }

// @Delete(':id')
// remove(@Param('id') id: string): Promise<void> { // DELETE endpoint to delete a user by ID
//     return this.userService.remove(id);
// }
// }
