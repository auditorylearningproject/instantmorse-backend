import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as http from 'http';
import * as https from 'https';
import { ConfigService } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';

let httpsOptions;

const server = express();

let port: number;
let devPort: number;

let appInstancePromise: Promise<INestApplication>;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  const configService = app.get(ConfigService);
  port = configService.get<number>('PORT');
  devPort = configService.get<number>('DEV_PORT');
  app.setGlobalPrefix('api');
  app.enableCors();
  await app.init();
  appInstancePromise = Promise.resolve(app);
}
//add CORS host?
(async () => {
  await bootstrap();
  const appInstance = await appInstancePromise;
  if (appInstance.get(ConfigService).get('isProduction') === true) {
    httpsOptions = {
      key: fs.readFileSync(
        '/etc/letsencrypt/live/instantmorse.codes/privkey.pem',
      ),
      cert: fs.readFileSync(
        '/etc/letsencrypt/live/instantmorse.codes/fullchain.pem',
      ),
    };
    const httpServer = http.createServer(server).listen(port);
    const httpsServer = https.createServer(httpsOptions, server).listen(443);

  } else {
    httpsOptions = {
      key: fs.readFileSync('src/config/local_certs/localhost.key'),
      cert: fs.readFileSync('src/config/local_certs/localhost.crt'),
    };
    const httpServer = http.createServer(server).listen(devPort);
  }

  
})();
