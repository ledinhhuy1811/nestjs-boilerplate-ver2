import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

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

  await app.listen(3000);
}

bootstrap();
