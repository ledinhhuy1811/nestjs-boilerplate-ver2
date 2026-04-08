import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

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
  ],
})
export class AppModule {}
