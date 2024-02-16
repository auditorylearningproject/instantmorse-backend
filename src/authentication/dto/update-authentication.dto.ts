import { PartialType } from '@nestjs/mapped-types';
import { signInDto } from './createUser.dto';

export class UpdateAuthenticationDto extends PartialType(signInDto) {}
