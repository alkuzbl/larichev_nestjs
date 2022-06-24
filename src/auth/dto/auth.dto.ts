import { IsString, Length, MIN } from 'class-validator';
import { PASSWORD_LENGTH_ERROR } from '../auth.constans';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty()
  @IsString()
  login: string;

  @ApiProperty()
  @Length(3, 16, { message: PASSWORD_LENGTH_ERROR })
  @IsString()
  password: string;
}
