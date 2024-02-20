import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
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

import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationController } from './authentication/authentication.controller';
import { UsersModule } from './authentication/users/users.module';
import { jwtConstants } from './authentication/constants';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.production', '.env.development'], //the first file takes precedence, so we can add ".env.production" only to the server.
      isGlobal: true,
      load: [configuration],
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(
        '/home/srvhost/project/instantmorse-frontend/app-frontend/dist',
      ),
      serveStaticOptions: { fallthrough: true },
    }),
    MongooseModule.forRoot(
      'mongodb://admin:M0rse23-24C0de@instantmorse.codes/',
    ),
    HttpModule,
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [AppController, TranscriptController, AuthenticationController],
  providers: [
    AppService,
    AuthenticationService,
    AuthenticationController,
    TranscribeService,
    {
      provide: APP_FILTER,
      useClass: NotFoundFilter,
    },
  ],
  exports: [AuthenticationService],
})
export class AppModule {}

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
