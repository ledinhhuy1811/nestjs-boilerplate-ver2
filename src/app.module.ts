import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';

import configs, { configSchema } from './configs';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { HealthModule } from './app/health/health.module';
import { CosmosModule } from './services/cosmos/cosmos.module';

@Module({
  imports: [
    // config module
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configs],
      validationSchema: configSchema,
      validationOptions: {
        abortEarly: true,
      },
    }),

    // cache module
    CacheModule.register({
      isGlobal: true,
    }),

    // services module
    CosmosModule,

    // app modules
    HealthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
