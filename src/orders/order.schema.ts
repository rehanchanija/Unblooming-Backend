import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true })
  customer: string;

  @Prop({ required: true })
  total: string;

  @Prop({ default: 'Pending' }) // Pending, Shipped, Delivered, Cancelled
  status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
