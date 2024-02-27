import { PartialType } from '@nestjs/mapped-types';
import { signInDto } from './signIn.dto';

export class UpdateAuthenticationDto extends PartialType(signInDto) {}
