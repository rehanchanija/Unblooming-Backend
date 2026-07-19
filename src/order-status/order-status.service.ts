import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderStatus, OrderStatusDocument } from './order-status.schema';

@Injectable()
export class OrderStatusService {
  constructor(@InjectModel(OrderStatus.name) private orderStatusModel: Model<OrderStatusDocument>) {}

  async create(createDto: { name: string }): Promise<OrderStatus> {
    const newStatus = new this.orderStatusModel(createDto);
    return newStatus.save();
  }

  async findAll(): Promise<OrderStatus[]> {
    return this.orderStatusModel.find().exec();
  }

  async findOne(id: string): Promise<OrderStatus> {
    const status = await this.orderStatusModel.findById(id).exec();
    if (!status) throw new NotFoundException('OrderStatus not found');
    return status;
  }

  async update(id: string, updateDto: { name?: string }): Promise<OrderStatus> {
    const updatedStatus = await this.orderStatusModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
    if (!updatedStatus) throw new NotFoundException('OrderStatus not found');
    return updatedStatus;
  }

  async remove(id: string): Promise<OrderStatus> {
    const deletedStatus = await this.orderStatusModel.findByIdAndDelete(id).exec();
    if (!deletedStatus) throw new NotFoundException('OrderStatus not found');
    return deletedStatus;
  }
}
