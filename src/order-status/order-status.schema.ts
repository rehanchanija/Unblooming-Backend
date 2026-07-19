import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderStatusDocument = OrderStatus & Document;

@Schema({ timestamps: true })
export class OrderStatus {
  @Prop({ required: true, unique: true })
  name: string;
}

export const OrderStatusSchema = SchemaFactory.createForClass(OrderStatus);
