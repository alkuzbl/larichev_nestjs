import { IsString } from 'class-validator';

export class TopPageAdvantageDto {
  @IsString()
  title: string;

  @IsString()
  description: string;
}
