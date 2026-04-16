import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { RegisterDto } from './dtos/register.dto';
import { UserRepository } from '../user/user.repository';
import { ConfigsInterface } from '../../configs/configs.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService<ConfigsInterface>,
  ) {}

  async registerUser(registerDto: RegisterDto) {
    const { name, age, email, password } = registerDto;

    const existedUser = await this.userRepository.findByEmail(email);
    if (existedUser) {
      throw new BadRequestException('Email already exists');
    }

    const bcryptRounds = this.configService.get<number>('bcryptRounds');
    if (!bcryptRounds) {
      throw new Error('BCRYPT_ROUNDS is not set');
    }

    const hashPassword = await bcrypt.hash(password, bcryptRounds);
    const user = await this.userRepository.create(
      {
        name,
        age,
        email,
        password: hashPassword,
      },
      false,
    );

    return { user };
  }

  async registerAdmin(registerDto: RegisterDto) {
    const { name, age, email, password } = registerDto;

    const existedAdmin = await this.userRepository.findByEmail(email);
    if (existedAdmin) {
      throw new BadRequestException('Email already exists');
    }

    const bcryptRounds = this.configService.get<number>('bcryptRounds');
    if (!bcryptRounds) {
      throw new Error('BCRYPT_ROUNDS is not set');
    }

    const hashPassword = await bcrypt.hash(password, bcryptRounds);
    const admin = await this.userRepository.create(
      {
        name,
        age,
        email,
        password: hashPassword,
      },
      true,
    );

    return { admin };
  }
}
