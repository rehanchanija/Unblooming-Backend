import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ColorDocument = Color & Document;

@Schema({ timestamps: true })
export class Color {
  @Prop({ required: true, unique: true })
  name: string;
}

export const ColorSchema = SchemaFactory.createForClass(Color);
