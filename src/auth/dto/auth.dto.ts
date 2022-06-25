import { IsString, Length, MIN } from 'class-validator';
import { PASSWORD_LENGTH_ERROR } from '../auth.constans';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @IsString()
  @ApiProperty({ type: String, description: 'валидный email' })
  login: string;

  @Length(3, 16, { message: PASSWORD_LENGTH_ERROR })
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Пароль не менее 3х символов и не более 16 символов',
  })
  password: string;
}
