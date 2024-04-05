import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JWT_EXPIRE } from 'src/authentication/auth.module';
import { CWSettings, CWSettingsSchema } from './settings.schema';
import { CWSettingsController } from './settings.controller';
import { CWSettingsService } from './settings.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: CWSettings.name, schema: CWSettingsSchema }],
      'preferences',
    ),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        global: true,
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: JWT_EXPIRE },
      }),
    }),
  ],
  controllers: [CWSettingsController],
  providers: [CWSettingsService],
  exports: [MongooseModule, CWSettingsService],
})
export class CWSettingsModule {}
