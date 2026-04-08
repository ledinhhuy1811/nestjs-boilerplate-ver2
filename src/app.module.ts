import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';

import configs, { configSchema } from './configs';

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
  ],
})
export class AppModule {}
