import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ColorsService } from './colors.service';

@Controller('colors')
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  @Post()
  create(@Body() createColorDto: any) {
    return this.colorsService.create(createColorDto);
  }

  @Get()
  findAll() {
    return this.colorsService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.colorsService.remove(id);
  }
}
