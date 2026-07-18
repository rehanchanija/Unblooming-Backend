import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContentDocument = Content & Document;

@Schema({ timestamps: true })
export class Content {
  // We can use a unique key like 'hero' or 'contact' to identify the content block
  @Prop({ required: true, unique: true })
  type: string;

  // Store the dynamic data as a flexible JSON object
  @Prop({ type: Object })
  data: any;
}

export const ContentSchema = SchemaFactory.createForClass(Content);
