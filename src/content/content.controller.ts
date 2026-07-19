import { Controller, Get, Put, Body, Param } from '@nestjs/common';
import { ContentService } from './content.service';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get(':type')
  findOne(@Param('type') type: string) {
    return this.contentService.findByType(type);
  }

  @Put(':type')
  upsert(@Param('type') type: string, @Body() data: any) {
    return this.contentService.upsert(type, data);
  }
}
