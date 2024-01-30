import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "../app.controller";
import { AppService } from "../app.service";
import { TranscribeService } from "./transcript.service";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import configuration from "../config/configuration";
import { TranscriptController } from "./transcript.controller";
import { APP_FILTER } from "@nestjs/core";
import { NotFoundFilter } from "../not-found-filter";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";

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
    UsersModule,
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
@Module({
  providers: [UsersService],
  exports: [UsersService],
})
@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "60s" },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class UsersModule {}
export class AppModule {}
export class AuthModule {}