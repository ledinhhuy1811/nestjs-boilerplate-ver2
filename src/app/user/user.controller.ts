import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import getOraichainBalanceSwagger from './swaggers/getOraichainBalance.swagger';
import { Swagger } from 'src/common/decorators/swagger.decorator';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('oraichain-balance/:address')
  @Swagger({
    operations: getOraichainBalanceSwagger.operations,
    params: getOraichainBalanceSwagger.params,
    responses: [
      getOraichainBalanceSwagger.responses[HttpStatus.OK],
      getOraichainBalanceSwagger.responses[HttpStatus.INTERNAL_SERVER_ERROR],
    ],
  })
  async getOraichainBalance(@Param('address') address: string) {
    const data = await this.userService.getOraichainBalance(address);

    return {
      data,
      message: 'Oraichain balance fetched successfully',
    };
  }
}
