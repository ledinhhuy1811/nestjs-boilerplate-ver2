import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from '../../schemas/user.schema';
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

  async findByEmail(email: string): Promise<UserDocument | null> {
    const user = await this.userModel.findOne({ email });

    return user?.toObject() as UserDocument | null;
  }

  async findById(id: string): Promise<UserDocument | null> {
    const user = await this.userModel.findById(id);

    return user?.toObject() as UserDocument | null;
  }

  async findAll(page: number, limit: number): Promise<UserDocument[]> {
    const users = await this.userModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return users.map((user) => user.toObject()) as UserDocument[];
  }

  async countAllUsers(): Promise<number> {
    return this.userModel.countDocuments();
  }
}
