/* eslint-disable @typescript-eslint/no-var-requires */
import { NestFactory } from '@nestjs/core';

// modules
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(4002);
}
bootstrap();
