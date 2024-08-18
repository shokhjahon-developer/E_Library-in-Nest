import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get<ConfigService>(ConfigService);
  const port = +configService.get('PORT');

  app.setGlobalPrefix('api');
  app.use(
    '/api/docs*',
    expressBasicAuth({
      challenge: true,
      users: {
        admin: configService.get('DOCS_PASS'),
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Online Library')
    .setDescription('E-Library for ordering books')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  await app.listen(port, () => {
    console.log(`Server is running on port: ${+port}`);
    console.log(
      `Open http://localhost:${port}/api/docs to see the API documentation`,
    );
  });
}
bootstrap();
