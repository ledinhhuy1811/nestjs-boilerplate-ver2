import {
  Injectable,
  Logger,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';

@Injectable()
export class TaskService implements OnModuleInit, OnApplicationShutdown {
  private readonly logger = new Logger(TaskService.name);
  private isAppActive = true;

  onModuleInit() {
    this.intervalTask();
  }

  onApplicationShutdown() {
    this.isAppActive = false;
  }

  private async intervalTask() {
    while (this.isAppActive) {
      try {
        this.logger.log('Running interval task...');
      } catch (error) {
        this.logger.error('Error in interval task: ', error);
      }

      await this.sleep(5000); // 5 second delay
    }
  }

  private sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
