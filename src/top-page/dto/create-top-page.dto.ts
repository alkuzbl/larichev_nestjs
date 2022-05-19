import { TopLevelCategory } from '../top-page.model';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { HhDataDto } from './hh-data.dto';
import { TopPageAdvantageDto } from './top-page-advantage.dto';

export class CreateTopPageDto {
  @IsString()
  firstCategory: TopLevelCategory;

  @IsString()
  secondCategory: string;

  @IsString()
  alias: string;

  @IsString()
  title: string;

  @IsString()
  category: string;

  @IsOptional()
  @Type(() => HhDataDto)
  hh?: HhDataDto;

  @IsArray()
  @Type(() => TopPageAdvantageDto)
  advantages: TopPageAdvantageDto[];

  @IsString()
  seoText: string;

  @IsString()
  tagsTitle: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];
}
