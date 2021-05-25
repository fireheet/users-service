import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';
import { logVerbose } from '@shared/helper/AppLogger';
import { SwaggerModule } from '@nestjs/swagger';
import openApiDoc from '@shared/docs/create-swagger-docs';
import AppModule from './AppModule';

/**
 * Imports for elastic and prod config
 *
 * import { INestApplication } from '@nestjs/common';
 * import elastic from 'elastic-apm-node';
 * import certConfig from '@config/cert.config';
 */

const PORT = process.env.PORT || '3333';

async function bootstrap() {
  // Starts Elastic Search APM Agent
  // elastic.start({
  //   serviceName: 'users',
  //   serverUrl: 'http://elasticsearch:8200',
  //   secretToken: '0e42111bb2384abd4691700e71cccfca',
  //   environment: 'development',
  // });

  // Setup Nest.Js app
  // let httpClient: INestApplication;

  // if (process.env.NODE_ENV === 'production')
  //   httpClient = await NestFactory.create(AppModule, certConfig);

  //   httpClient = await NestFactory.create(AppModule);
  // else httpClient = await NestFactory.create(AppModule);

  const httpClient = await NestFactory.create(AppModule);

  // Setup Swagger/Open Api
  SwaggerModule.setup('api', httpClient, openApiDoc(httpClient));

  await httpClient.listen(PORT);

  logVerbose('Application', `Server listening on port: ${PORT}`);
}

bootstrap();
