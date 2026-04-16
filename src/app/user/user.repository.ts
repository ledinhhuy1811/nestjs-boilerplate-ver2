import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from '../../schemas/user.schema';
import { RegisterDto } from '../auth/dtos/register.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(user: RegisterDto, isAdmin: boolean): Promise<User> {
    const newUser = await this.userModel.create({
      ...user,
      role: isAdmin ? 'admin' : 'user',
    });

    return newUser.toObject();
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });

    return user?.toObject() || null;
  }
}
