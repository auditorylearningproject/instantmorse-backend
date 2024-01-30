import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
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

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env.production", ".env.development"],
      isGlobal: true,
      load: [configuration],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(
        __dirname,
        "..",
        "..",
        "instantmorse-frontend",
        "app-frontend",
        "dist",
      ),
      serveStaticOptions: { fallthrough: false },
    }),
    //MongooseModule.forRoot('mongodb+srv://'+config.user+':'+config.pass+'@auditorylearningproject.xixsty6.mongodb.net/morse?retryWrites=true&w=majority'),
    HttpModule,
  ],
  controllers: [AppController, TranscriptController],
  providers: [
    AppService,
    TranscribeService,
    {
      provide: APP_FILTER,
      useClass: NotFoundFilter,
    },
  ],
})
export class AppModule {}
