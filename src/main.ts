import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as http from 'http';
import * as https from 'https';


const httpsOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/instantmorse.codes/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/instantmorse.codes/fullchain.pem'),
};

const server = express()

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.setGlobalPrefix('api');
  await app.init();
}
bootstrap();
const httpServer = http.createServer(server).listen(3000);
const httpsServer = https.createServer(httpsOptions, server).listen(443);


