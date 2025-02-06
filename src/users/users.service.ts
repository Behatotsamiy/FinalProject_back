import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor (@InjectModel(User.name) private userModel : Model<User>){}
  async create(createUserDto: CreateUserDto) {
    
    const newUser = await this.userModel.create(createUserDto);
    return newUser || [];
  }

   async findAll() {
    const users = await this.userModel.find()
    if(!users){
      throw new NotFoundException('users not found')
    }
    return users;
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id);
    return user ;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updUser = await this.userModel.findByIdAndUpdate(id, updateUserDto)
    return updUser;
  }

  async remove(id: number) {
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    return deletedUser;
  }
}
