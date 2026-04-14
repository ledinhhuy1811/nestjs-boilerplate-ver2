import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import getOraichainBalanceSwagger from './swaggers/getOraichainBalance.swagger';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('oraichain-balance/:address')
  @ApiOperation({
    ...getOraichainBalanceSwagger.operations,
  })
  @ApiParam({ ...getOraichainBalanceSwagger.params })
  @ApiResponse({ ...getOraichainBalanceSwagger.responses[HttpStatus.OK] })
  @ApiResponse({
    ...getOraichainBalanceSwagger.responses[HttpStatus.INTERNAL_SERVER_ERROR],
  })
  async getOraichainBalance(@Param('address') address: string) {
    const data = await this.userService.getOraichainBalance(address);

    return {
      data,
      message: 'Oraichain balance fetched successfully',
    };
  }
}
