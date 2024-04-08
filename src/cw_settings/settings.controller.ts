import {
  Controller,
  Get,
  Put,
  Body,
  HttpStatus,
  BadRequestException,
  UseGuards,
  Req,
  HttpException,
  HttpCode,
} from '@nestjs/common';
import { CWSettings } from './settings.dto';
import { AuthGuard } from 'src/authentication/auth.guard';
import mongoose from 'mongoose';
import { CWSettingsService } from './settings.service';

@UseGuards(AuthGuard)
@Controller('settings')
export class CWSettingsController {
  constructor(private settingsService: CWSettingsService) {}

  @Get()
  async getCWSettings(@Req() req): Promise<CWSettings> {
    // Generate random settingsy
    try {
      const settings = await this.settingsService.getSettings(
        new mongoose.Types.ObjectId(req.user['sub'] ?? 'null'),
      );
      if (!settings) {
        throw new Error();
      } else {
        return settings as CWSettings;
      }
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve settings.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @HttpCode(HttpStatus.OK)
  @Put()
  async updateSettings(@Body() settings: CWSettings): Promise<HttpStatus> {
    // Simulate random success or failure
    const didUpdate: boolean =
      await this.settingsService.updateSettings(settings);
    if (didUpdate) {
      return;
    } else {
      // Failure case
      throw new BadRequestException('Failed to update settings');
    }
  }
}
