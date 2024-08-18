import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/models';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}
  async register({ fullname, username, password }: RegisterDto) {
    const user = await this.userModel.findOne({ username: username });
    if (user) {
      throw new BadRequestException('Username already exists');
    }
    const hashedPass = await hash(password, 12);
    const newUser = await this.userModel.create({
      fullname,
      username,
      password: hashedPass,
    });

    const token = await this.jwt.sign(
      { id: newUser.id },
      {
        secret: this.config.get('JWT_SECRET_KEY'),
        expiresIn: this.config.get('JWT_EXPIRATION'),
      },
    );
    return { data: token };
  }

  async login({ username, password }: LoginDto) {
    const user = await this.userModel.findOne({ username: username });
    if (!user) {
      throw new BadRequestException('Invalid username or password');
    }
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid username or password');
    }
    const token = await this.jwt.sign(
      { id: user.id },
      {
        secret: this.config.get('JWT_SECRET_KEY'),
        expiresIn: this.config.get('JWT_EXPIRATION'),
      },
    );
    return { data: token };
  }
}
