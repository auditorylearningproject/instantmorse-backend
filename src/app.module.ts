import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TranscribeService } from './transcript/transcript.service';
import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';
import configuration from './config/configuration';
import { TranscriptController } from './transcript/transcript.controller';
import { HttpModule } from '@nestjs/axios';
import { APP_FILTER } from '@nestjs/core';
import { NotFoundFilter } from './not-found-filter';
import * as path from 'path';

//import { AuthenticationService } from './authentication/authentication.service';
//import { AuthenticationController } from './authentication/authentication.controller';
// import { UsersModule } from './authentication/users/users.module';
import mongoose from 'mongoose';
import { UsersModule } from './authentication/users/users.module';
import { AuthModule } from './authentication/auth.module';
import { AttemptModule } from './lesson_attempts/attempt.module';
//import { UsersModule } from './authentication/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.production', '.env.development', '.env'], //the first file takes precedence, so we can add ".env.production" only to the server.
      isGlobal: true,
      load: [configuration],
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(
        '/home/srvhost/project/instantmorse-frontend/app-frontend/dist',
      ),
      exclude: ['/api*'],
      serveStaticOptions: { fallthrough: true }, //change to true to drop requests
    }),
    // begin MongoDB connections
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      connectionName: 'lessons',
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('DB_CONNECTION_STRING'),
        tls: true,
        dbName: 'Lessons',
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      connectionName: 'users',
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('DB_CONNECTION_STRING'),
        tls: true,
        dbName: 'users',
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      connectionName: 'statistics',
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('DB_CONNECTION_STRING'),
        tls: true,
        dbName: 'statistics',
      }),
    }),
    // end of MongoDB connections
    HttpModule,
    UsersModule,
    AuthModule,
    AttemptModule,
  ],
  controllers: [AppController, TranscriptController], //AuthenticationController],
  providers: [
    AppService,
    //AuthenticationService,
    //AuthenticationController,
    TranscribeService,
    {
      provide: APP_FILTER,
      useClass: NotFoundFilter,
    },
  ],
})
export class AppModule {}

mongoose.connection.on('error', (err) => {
  console.log(err);
});
console.error(
  path.resolve(
    __dirname,
    '..',
    '..',
    'instantmorse-frontend',
    'app-frontend',
    'dist',
  ),
);
