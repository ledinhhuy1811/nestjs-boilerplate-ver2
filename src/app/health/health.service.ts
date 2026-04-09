import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  checkHealth() {
    return {
      data: {
        status: HttpStatus.OK,
      },
      message: 'Server is running',
    };
  }
}
