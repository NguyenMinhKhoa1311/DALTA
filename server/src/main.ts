import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import * as admin from 'firebase-admin';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(new ValidationPipe());

  const serviceAccount = require('../config/storage.json');

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://storagedoan.appspot.com',
  });

  await app.listen(3000);
}
bootstrap();
