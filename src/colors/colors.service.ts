import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Color, ColorDocument } from './color.schema';

@Injectable()
export class ColorsService {
  constructor(@InjectModel(Color.name) private colorModel: Model<ColorDocument>) {}

  async create(createColorDto: any): Promise<Color> {
    const createdColor = new this.colorModel(createColorDto);
    return createdColor.save();
  }

  async findAll(): Promise<Color[]> {
    return this.colorModel.find().exec();
  }

  async remove(id: string): Promise<Color> {
    const deletedColor = await this.colorModel.findByIdAndDelete(id).exec();
    if (!deletedColor) {
      throw new NotFoundException(`Color with ID ${id} not found`);
    }
    return deletedColor;
  }
}
