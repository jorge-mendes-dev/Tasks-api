import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { existsSync, unlinkSync } from 'fs';
import { AppService } from './app.service';

async function bootstrap() {
  const dbFile = 'db.sqlite';
  if (existsSync(dbFile) && process.env.NODE_ENV === 'development') {
    unlinkSync(dbFile);
  }

  const app = await NestFactory.create(AppModule);
  const appService = app.get(AppService);
  
/*   if (process.env.NODE_ENV === 'development') {
    await appService.seed();
  } */

  app.useGlobalPipes(
    new ValidationPipe({ 
      whitelist: true, 
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      }, 
    }));
  await app.listen(4000);
}

bootstrap();