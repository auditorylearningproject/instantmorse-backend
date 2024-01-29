import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TranscribeService } from './transcript.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import configuration from './config/configuration';
import * as config from './config/sensitive';
import { TranscriptController } from './transcript.controller';
import { HttpModule } from '@nestjs/axios';
import { APP_FILTER } from '@nestjs/core';
import { NotFoundFilter } from './not-found-filter';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.production', '.env.development'],
      isGlobal: true,
      load: [configuration],
          }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve('/home/srvhost/project/instantmorse-frontend/app-frontend/dist'),
      serveStaticOptions: { fallthrough: true },
    }),
    //MongooseModule.forRoot('mongodb+srv://'+config.user+':'+config.pass+'@auditorylearningproject.xixsty6.mongodb.net/morse?retryWrites=true&w=majority'),
    HttpModule,
  ],
  controllers: [AppController, TranscriptController],
  providers: [AppService, TranscribeService, {
    provide: APP_FILTER,
    useClass: NotFoundFilter,
  },],
})
export class AppModule {}

console.error(path.resolve(
        __dirname,
        '..',
        '..',
        'instantmorse-frontend',
        'app-frontend',
        'dist',
      ))
