import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import getOraichainBalanceSwagger from './swaggers/getOraichainBalance.swagger';
import { Swagger } from '../../common/decorators/swagger.decorator';
import { JwtGuard } from '../../common/guards/jwt.guard';
import getUserSwagger from './swaggers/getUser.swagger';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtGuard)
  @Swagger({
    bearerAuth: true,
    operations: getUserSwagger.operations,
    responses: getUserSwagger.responses,
  })
  async getUser(@Req() request: Request) {
    const user = request['user'];
    const data = await this.userService.getUser(user.id);

    return {
      data,
      message: 'User fetched successfully',
    };
  }

  @Get('oraichain-balance/:address')
  @Swagger({
    operations: getOraichainBalanceSwagger.operations,
    params: getOraichainBalanceSwagger.params,
    responses: getOraichainBalanceSwagger.responses,
  })
  async getOraichainBalance(@Param('address') address: string) {
    const data = await this.userService.getOraichainBalance(address);

    return {
      data,
      message: 'Oraichain balance fetched successfully',
    };
  }
}
