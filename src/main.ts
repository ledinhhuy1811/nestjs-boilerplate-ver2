import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { ConfigsInterface } from './configs/configs.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // set security http header
  app.use(helmet());

  // set cors
  app.enableCors({
    origin: '*',
    credentials: true,
    exposedHeaders: ['set-cookie'],
  });

  // gzip compression
  app.use(compression());

  // cookie parser
  app.use(cookieParser());

  // graceful shutdown
  app.enableShutdownHooks();

  // get config service
  const configService: ConfigService<ConfigsInterface> = app.get(ConfigService);

  const port = configService.get('port');
  const env = configService.get('env');

  await app.listen(port, () => {
    console.log(`Server is running on port ${port} in ${env} mode`);
  });
}

bootstrap();
