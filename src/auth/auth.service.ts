import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/auth.dto';
import { log } from 'console';
import * as bcrjs from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  async login(body: LoginDto) {
    console.log('Полученные данные:', body);

    const user = await this.userModel.findOne({ phone: body.phone }).exec();
    console.log(user);
    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }

    const isMatch = await bcrjs.compare(body.password, user.password);
    if (!isMatch) {
      throw new NotFoundException('Invalid credentials');
    }

    const token = this.jwtService.sign(
      { i: user._id, r: user.role },
      { secret: 'itismysecret', algorithm: 'HS256' },
    );
    return { token, user };
  }

  async register(body: any) {
    const user = await this.userModel.findOne({ phone: body.phone }).exec();
    const phoneExist = await this.userModel.findOne({ phone: body.phone });
    if (phoneExist) {
      throw new BadRequestException('phone already exists');
    }
    if (user) {
      throw new BadRequestException('bad request');
    }
    const token = this.jwtService.sign(
      { i: user?._id, r: user?.role },
      { secret: 'itismysecret', algorithm: 'HS256' },
    );
    const newUser = new this.userModel(body);
    await newUser.save();
    return { newUser, token };
  }
}
