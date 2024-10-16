import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/users.schema';
import { Model } from 'mongoose';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async login(username: string, password: string) {
    const user = await this.userModel.findOne({ username }).exec();

    if (!user) {
      throw new UnauthorizedException();
    }

    const isEqualPassword = await compare(password, user.password);

    if (!isEqualPassword) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user._id,
      user: {
        username: user.username,
        id: user._id,
        name: user.name,
        roles: user.roles,
      },
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
