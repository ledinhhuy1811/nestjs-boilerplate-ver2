import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { RegisterDto } from './dtos/register.dto';
import { UserRepository } from '../user/user.repository';
import { ConfigsInterface } from '../../configs/configs.interface';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService<ConfigsInterface>,
    private readonly jwtService: JwtService,
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

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Wrong password');
    }

    const payload = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };
    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
    };
  }

  private generateAccessToken(payload: any) {
    const { accessTokenExpirationTime } = this.configService.get('jwt');

    return this.jwtService.sign(payload, {
      expiresIn: accessTokenExpirationTime || '5m',
    });
  }

  private generateRefreshToken(payload: any) {
    const { refreshTokenExpirationTime } = this.configService.get('jwt');

    return this.jwtService.sign(payload, {
      expiresIn: refreshTokenExpirationTime || '1d',
    });
  }
}
