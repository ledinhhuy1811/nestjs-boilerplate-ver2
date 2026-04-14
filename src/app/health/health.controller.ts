import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { HealthService } from './health.service';
import checkHealthSwagger from './swaggers/checkHealth.swagger';
import { Swagger } from 'src/common/decorators/swagger.decorator';

@Controller('health')
@ApiTags('Health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @Swagger({
    operations: checkHealthSwagger.operations,
    responses: [
      checkHealthSwagger.responses[HttpStatus.OK],
      checkHealthSwagger.responses[HttpStatus.INTERNAL_SERVER_ERROR],
    ],
  })
  checkHealth() {
    const data = this.healthService.checkHealth();

    return {
      data,
      message: 'Server is running',
    };
  }
}
