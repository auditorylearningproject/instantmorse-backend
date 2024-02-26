import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.schema';

// export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name, 'users') private userModel: Model<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(userId: string): Promise<User> {
    return this.userModel.findById(userId).exec();
  }

  async findByUsername(userName: string): Promise<User> {
    try {
      const user = await User.findOne({ name: userName });
      console.log(user);
    } catch (error) {
      console.error(error);
    }
  }
  // async findByUsername(username: string): Promise<User | undefined> {
  //   return this.userModel.findOne({ username: username }).exec();
  // }

  async findByToken(access_token: string): Promise<User> {
    return this.userModel.findOne({ access_token }).exec();
  }

  // async create(username: User): Promise<User> {
  //   const createdUser = new this.userModel(username);
  //   return createdUser.save();
  // }
  async create(createUserDto: Model<User>): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async update(userId: number, username: User): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(userId, username, { new: true })
      .exec();
  }

  async delete(userId: number): Promise<User> {
    return this.userModel.findByIdAndDelete(userId).exec();
  }
}
