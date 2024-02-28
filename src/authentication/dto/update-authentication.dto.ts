import { PartialType } from '@nestjs/mapped-types';
import { SignInDto } from './signIn.dto';

export class UpdateAuthenticationDto extends PartialType(SignInDto) {}
