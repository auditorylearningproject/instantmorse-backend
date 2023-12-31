import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.production', '.env.development'],
      isGlobal: true,
      load: [configuration]
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'instantmorse-frontend', 'app-frontend', 'dist'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
