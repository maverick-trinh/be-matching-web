import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Matching Web API')
    .setDescription('API documentation for the Matching Web application')
    .setVersion('1.0')
    .addTag('users', 'User management endpoints')
    .addTag('members', 'Member profile endpoints')
    .addTag('photos', 'Photo management endpoints')
    .addTag('likes', 'Like/Match endpoints')
    .addTag('messages', 'Messaging endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
