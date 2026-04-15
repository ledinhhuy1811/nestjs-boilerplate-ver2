import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import registerSwagger from './swaggers/register.swagger';
import { Swagger } from '../../common/decorators/swagger.decorator';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register-user')
  @Swagger({
    operations: registerSwagger.operations,
    body: registerSwagger.body,
    responses: registerSwagger.responses,
  })
  async registerUser(@Body() registerDto: RegisterDto) {
    const data = await this.authService.registerUser(registerDto);

    return {
      data,
      message: 'User registered successfully',
    };
  }
}
