import { IsString, Length, MIN } from 'class-validator';
import { PASSWORD_LENGTH_ERROR } from '../auth.constans';

export class AuthDto {
  @IsString()
  login: string;

  @Length(3, 16, { message: PASSWORD_LENGTH_ERROR })
  @IsString()
  password: string;
}
