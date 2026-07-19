import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderStatusService } from './order-status.service';
import { OrderStatusController } from './order-status.controller';
import { OrderStatus, OrderStatusSchema } from './order-status.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: OrderStatus.name, schema: OrderStatusSchema }])],
  controllers: [OrderStatusController],
  providers: [OrderStatusService],
})
export class OrderStatusModule {}
