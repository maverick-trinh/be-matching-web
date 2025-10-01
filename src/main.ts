import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './shared/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const logger = new Logger('Bootstrap');

  app.useLogger(logger);

  const allowedOrigins = process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',')
        .map((origin) => origin.trim())
        .filter(Boolean)
    : ['http://localhost:3000'];

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor());

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
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3001, '0.0.0.0');
}
bootstrap().catch((error: unknown) => {
  const bootstrapLogger = new Logger('Bootstrap');
  const trace = error instanceof Error ? error.stack : undefined;
  bootstrapLogger.error('Failed to start application', trace);
  process.exit(1);
});
