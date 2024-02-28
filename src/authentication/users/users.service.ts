import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { webUser } from './users.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(webUser.name, 'user-connect')
    private userModel: Model<webUser>,
  ) {}

  async findAll(): Promise<webUser[]> {
    return this.userModel.find().exec();
  }

  async findById(userId: number): Promise<webUser> {
    return this.userModel.findById(userId).exec();
  }

  async findByUsername(userName: string): Promise<webUser | undefined> {
    // const username = userName.toLowerCase();
    const user = await this.userModel.findOne({ username: userName }).exec();
    return user;
  }

  async findByToken(access_token: string): Promise<webUser> {
    return this.userModel.findOne({ access_token }).exec();
  }

  // async create(username: User): Promise<webUser> {
  //   const createdUser = new this.userModel(username);
  //   return createdUser.save();
  // }
  async create(createUserDto: CreateUserDto): Promise<webUser> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async update(userId: number, username: webUser): Promise<webUser> {
    return this.userModel
      .findByIdAndUpdate(userId, username, { new: true })
      .exec();
  }

  async delete(userId: number): Promise<webUser> {
    return this.userModel.findByIdAndDelete(userId).exec();
  }
}
