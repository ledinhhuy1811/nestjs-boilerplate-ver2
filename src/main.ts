import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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

  // enable versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // get config service
  const configService: ConfigService<ConfigsInterface> = app.get(ConfigService);

  const port = configService.get('port');
  const env = configService.get('env');

  // app logger
  const logger = new Logger(AppModule.name);

  // swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('NestJs Boilerplate Ver2')
    .setDescription('The NestJs Boilerplate Ver2 API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(port, () => {
    logger.log(`Server is running on port ${port} in ${env} mode`);
  });
}

bootstrap();
