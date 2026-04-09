import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { HealthService } from './health.service';
import { checkHealthSwagger } from './health.swagger';

@Controller('health')
@ApiTags('Health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({
    ...checkHealthSwagger.operations,
  })
  @ApiResponse({ ...checkHealthSwagger.responses[HttpStatus.OK] })
  @ApiResponse({
    ...checkHealthSwagger.responses[HttpStatus.INTERNAL_SERVER_ERROR],
  })
  checkHealth() {
    return this.healthService.checkHealth();
  }
}
