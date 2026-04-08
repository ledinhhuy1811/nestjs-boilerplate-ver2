import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { ConfigsInterface } from './configs/configs.interface';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

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

  // global exception filters
  app.useGlobalFilters();

  // global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // global interceptors
  app.useGlobalInterceptors(new ResponseInterceptor());

  // graceful shutdown
  app.enableShutdownHooks();

  // get config service
  const configService: ConfigService<ConfigsInterface> = app.get(ConfigService);

  const port = configService.get('port');
  const env = configService.get('env');

  // app logger
  const logger = new Logger(AppModule.name);

  await app.listen(port, () => {
    logger.log(`Server is running on port ${port} in ${env} mode`);
  });
}

bootstrap();
