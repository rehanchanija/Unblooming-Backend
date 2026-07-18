import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Content, ContentDocument } from './content.schema';

@Injectable()
export class ContentService {
  constructor(@InjectModel(Content.name) private contentModel: Model<ContentDocument>) {}

  // Find content by type (e.g. 'hero', 'contact')
  async findByType(type: string): Promise<Content> {
    const content = await this.contentModel.findOne({ type }).exec();
    if (!content) {
      throw new NotFoundException(`Content of type ${type} not found`);
    }
    return content;
  }

  // Update or create content for a specific type
  async upsert(type: string, data: any): Promise<Content> {
    const updatedContent = await this.contentModel.findOneAndUpdate(
      { type },
      { type, data },
      { new: true, upsert: true }
    ).exec();
    return updatedContent;
  }
}
