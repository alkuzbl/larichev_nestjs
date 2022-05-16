import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TopPageModel } from './top-page.model';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { IdValidationPipe } from '../pipes/id-validation.pipe';

@Controller('top-page')
export class TopPageController {
  @Post('create')
  async create(@Body() dto: Omit<TopPageModel, '_id'>) {}

  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {}

  @Patch('id')
  async update(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: TopPageModel,
  ) {}

  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {}

  @HttpCode(200)
  @Post()
  async find(@Body() dto: FindTopPageDto) {}
}
