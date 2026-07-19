import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  category: string;

  @Prop({ type: [{ color: String, imageUrl: String }] })
  variants: { color: string; imageUrl: string }[];

  @Prop({ required: true })
  price: string;

  @Prop({ default: 0 })
  stock: number;

  @Prop()
  details: string;

  @Prop({ type: Object })
  technicalSpecifications: any;

}

export const ProductSchema = SchemaFactory.createForClass(Product);
