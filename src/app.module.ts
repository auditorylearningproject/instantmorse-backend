import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TranscribeService } from "./transcript.service";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import configuration from "./config/configuration";
import { TranscriptController } from "./transcript.controller";
import { HttpModule } from "@nestjs/axios";
import { APP_FILTER } from "@nestjs/core";
import { NotFoundFilter } from "./not-found-filter";
import * as path from "path";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthenticationController } from "./authentication.controller";
import { AuthenticationService } from "./authentication/authentication.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env.production", ".env.development"],
      isGlobal: true,
      load: [configuration],
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(
        "/home/srvhost/project/instantmorse-frontend/app-frontend/dist",
      ),
      serveStaticOptions: { fallthrough: true },
    }),
    HttpModule,
    AuthenticationModule,
    // MongooseModule.forRoot('mongodb://localhost/nest-blog', { useNewUrlParser: true }),
  ],
  controllers: [AppController, TranscriptController, AuthenticationController],
  providers: [
    AppService,
    TranscribeService,
    {
      provide: APP_FILTER,
      useClass: NotFoundFilter,
    },
    AuthenticationService,
  ],
  exports: [AuthenticationService],
})
export class AppModule {}

console.error(
  path.resolve(
    __dirname,
    "..",
    "..",
    "instantmorse-frontend",
    "app-frontend",
    "dist",
  ),
);
