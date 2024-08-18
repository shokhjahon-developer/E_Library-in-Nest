import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/models';
import { Model } from 'mongoose';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async create(payload: CreateUserDto) {
    const user = await this.userModel.findOne({ username: payload.username });
    if (user) {
      throw new BadRequestException('User with this username already exists');
    }
    const hashedPass = await hash(payload.password, 12);
    const newUser = await this.userModel.create({
      username: payload.username,
      fullname: payload.fullname,
      password: hashedPass,
    });
    return newUser;
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User with this id does not exist');
    }
    return user;
  }

  async update(id: string, payload: UpdateUserDto) {
    await this.findOne(id);
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true },
    );
    return updatedUser;
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.userModel.findByIdAndDelete(id);
    return `User with id ${id} has been deleted`;
  }
}
