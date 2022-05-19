import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TopPageModel } from './top-page.model';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { TopPageService } from './top-page.service';
import { CreateTopPageDto } from './dto/create-top-page.dto';

@Controller('top-page')
export class TopPageController {
  constructor(private readonly topPageService: TopPageService) {}

  @Post('create')
  async create(@Body() dto: CreateTopPageDto) {
    return await this.topPageService.create(dto);
  }

  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    const topPage = await this.topPageService.findById(id);
    if (!topPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND);
    }
    return topPage;
  }

  @Patch('id')
  async update(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: TopPageModel,
  ) {
    const updatedTopPage = await this.topPageService.updateById(id, dto);
    if (!updatedTopPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND);
    }
    return updatedTopPage;
  }

  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const deletedTopPage = await this.topPageService.deleteById(id);
    if (!deletedTopPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND);
    }
  }

  @HttpCode(200)
  @Post()
  async find(@Body() dto: FindTopPageDto) {}
}
