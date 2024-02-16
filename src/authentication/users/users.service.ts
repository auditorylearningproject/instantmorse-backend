import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'David',
      password: 'Garstecki',
    },
    {
      userId: 2,
      username: 'admin',
      password: 'CantBeSyncedToGithub',
    },
  ];

  async findUser(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
    // if (username === users.username && password === user.password) {
    //   return "Success"; //return JWT token or refer to the file that will make that token
    // } else {
    //   return "No" //error out
  }
  // return this.users.find((user) => user.username === username && user.password === password);
  // }
  // async findAll(): Promise<User[] | undefined> {
  //   return this.users;
  // }
}
