import { Injectable } from '@nestjs/common';
import { UserCreateDTO } from './user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(userDTO: UserCreateDTO) {
    const userCreated = new this.userModel(userDTO);
    const user = await userCreated.save();
    console.log(user);
    return user;
  }
}
