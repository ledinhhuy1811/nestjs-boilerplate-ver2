import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import {
  registerAdminSwagger,
  registerUserSwagger,
} from './swaggers/register.swagger';
import { Swagger } from '../../common/decorators/swagger.decorator';
import { ApiKeyGuard } from '../../common/guards/apiKey.guard';
import { LoginDto } from './dtos/login.dto';
import { loginUserSwagger } from './swaggers/login.swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register-user')
  @Swagger({
    operations: registerUserSwagger.operations,
    body: registerUserSwagger.body,
    responses: registerUserSwagger.responses,
  })
  async registerUser(@Body() registerDto: RegisterDto) {
    const data = await this.authService.registerUser(registerDto);

    return {
      data,
      message: 'User registered successfully',
    };
  }

  @Post('register-admin')
  @UseGuards(ApiKeyGuard)
  @Swagger({
    apiKey: registerAdminSwagger.apiKey,
    operations: registerAdminSwagger.operations,
    body: registerAdminSwagger.body,
    responses: registerAdminSwagger.responses,
  })
  async registerAdmin(@Body() registerDto: RegisterDto) {
    const data = await this.authService.registerAdmin(registerDto);

    return {
      data,
      message: 'Admin registered successfully',
    };
  }

  @Post('login-user')
  @Swagger({
    operations: loginUserSwagger.operations,
    body: loginUserSwagger.body,
    responses: loginUserSwagger.responses,
  })
  async loginUser(@Body() loginDto: LoginDto) {
    const data = await this.authService.loginUser(loginDto);

    return {
      data,
      message: 'User logged in successfully',
    };
  }
}
