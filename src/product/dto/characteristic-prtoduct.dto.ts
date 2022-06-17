import { IsString } from 'class-validator';

export class CharacteristicProductDto {
  @IsString()
  name: string;

  @IsString()
  value: string;
}
