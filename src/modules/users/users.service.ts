import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserCreateDTO } from './user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.schema';
import { Model } from 'mongoose';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(userDTO: UserCreateDTO) {
    const userAlreadyExists = await this.userModel
      .findOne({
        username: userDTO.username,
      })
      .exec();

    if (userAlreadyExists) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const password = await hash(userDTO.password, 10);

    const userCreated = new this.userModel({ ...userDTO, password });
    const user = await userCreated.save();
    console.log(user);
    return user;
  }
}
