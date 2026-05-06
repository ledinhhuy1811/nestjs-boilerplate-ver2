import { Injectable, Logger } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class ScheduleService {
  private readonly logger = new Logger(ScheduleService.name);

  constructor(private readonly schedulerRegistry: SchedulerRegistry) {}

  @Cron('10 * * * *')
  handleCronLogger() {
    this.logger.debug('Called when the current second is 10');
  }
}
