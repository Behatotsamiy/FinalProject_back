import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  async login(body: LoginDto) {
    const user = await this.userModel
      .findOne({ phonenumber: body.phonenumber, password: body.password })
      .exec();
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = this.jwtService.sign(
      { i: user?._id, r: user?.role },
      { secret: 'itismysecret', algorithm: 'HS256' },
    );
    return { token };
  }
  async register(body: any) {
    const user = await this.userModel.findOne({ phonenumber: body.phone }).exec();
    const phoneExist = await this.userModel.findOne({ phone: body.phone})
    if (phoneExist) {
      throw new BadRequestException('phone already exists')
    }
    if(user){
      throw new BadRequestException('bad request');
    }
    const token = this.jwtService.sign(
      { i: user?._id, r: user?.role },
      { secret: 'itismysecret', algorithm: 'HS256' },
    );
    const newUser = new this.userModel(body);
    await newUser.save();
    return {newUser, token};
  }
}
