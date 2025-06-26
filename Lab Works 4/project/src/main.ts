import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips properties that do not have any decorators
      forbidNonWhitelisted: true, // throws error on extra fields
      transform: true, // auto-transform payloads to DTO instances
    }),
  );
  await app.listen(3000);
}
bootstrap();
