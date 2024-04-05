import mongoose, { Error, Model } from 'mongoose';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CWSettings } from './settings.schema';
import { ok } from 'assert';

@Injectable()
export class CWSettingsService {
  constructor(
    @InjectModel(CWSettings.name, 'preferences')
    private settingsModel: Model<CWSettings>,
  ) {}

  //   async updateSettings(
  //     updated_settings: CWSettings,
  //   ): Promise<CWSettings | null> {}

  async updateSettings(settingsDto: CWSettings): Promise<boolean> {
    try {
      if (!this.isValidUserSettings(settingsDto)) {
        console.log('User settings are NOT valid');
        throw new Error('Invalid updated settings');
      }
      settingsDto = {
        ...settingsDto,
        user_id: new mongoose.Types.ObjectId(settingsDto.user_id),
      };
      // Find the first CWSettings document that matches the user_id
      let settings = await this.settingsModel.findOne({
        user_id: new mongoose.Types.ObjectId(settingsDto.user_id),
      });

      if (!settings) {
        // Handle the case where no matching settings document is found
        return false;
      }

      // Update the found settings with the updated_settings
      settings = Object.assign(settings, settingsDto);

      // Validate the updated settings before saving
      const validationErrors = settings.validateSync();
      if (validationErrors instanceof Error.ValidationError) {
        // Handle the case where updated_settings is invalid
        throw new Error('Invalid updated settings');
      }

      // Save the updated settings
      await settings.save();

      return true;
    } catch (error) {
      // Handle any errors that occur during the update process
      throw new HttpException(
        `Failed to update settings: ${error.message}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async getSettings(
    userId: mongoose.Types.ObjectId,
  ): Promise<CWSettings | unknown> {
    const settings = this.settingsModel
      .findOne(
        {
          user_id: userId,
        },
        { __v: 0 }, //_id: 0,
      )
      .exec();

    if (!settings) {
      throw new NotFoundException('No user settings found.');
    } else {
      return settings;
    }
  }

  async createSettings(userId: mongoose.Types.ObjectId) {
    ok(!this.getSettings(userId)); // ensure the user doesn't already have settings in the DB
    //mongoDB Create new
    await this.settingsModel.create({ //const createdSettings = 
      user_id: userId,
      char_speed: 20,
      effective_speed_wpm: 20,
      playback_tone_hz: 600,
      session_length: 20,
    });
    return;
  }

  // Define a type guard function to check if a number falls within a specific range
  isInRange(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
  }

  // Define a type guard function to validate if user settings are within valid ranges
  isValidUserSettings(settings: CWSettings): settings is CWSettings {
    return (
      this.isInRange(settings.char_speed, 1, 100) &&
      this.isInRange(settings.effective_speed_wpm, 1, 100) &&
      this.isInRange(settings.playback_tone_hz, 400, 1000) &&
      this.isInRange(settings.session_length, 1, Infinity)
    );
  }
}
