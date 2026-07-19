import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class OrderItem {
  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  price: string;

  @Prop({ required: true })
  quantity: number;

  @Prop()
  imageUrl: string;

  @Prop()
  color: string;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true })
  customer: string;

  @Prop({ required: true })
  total: string;

  @Prop({ required: true })
  productName: string;

  @Prop()
  address: string;

  @Prop({ type: [OrderItemSchema], default: [] })
  items: OrderItem[];

  @Prop({ default: 'Pending' }) // Pending, Shipped, Delivered, Cancelled
  status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
