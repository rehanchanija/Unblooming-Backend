import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderStatusService } from './order-status.service';

@Controller('order-status')
export class OrderStatusController {
  constructor(private readonly orderStatusService: OrderStatusService) {}

  @Post()
  create(@Body() createDto: { name: string }) {
    return this.orderStatusService.create(createDto);
  }

  @Get()
  findAll() {
    return this.orderStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderStatusService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: { name?: string }) {
    return this.orderStatusService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderStatusService.remove(id);
  }
}
