import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book, Order, User } from 'src/models';
import { Model } from 'mongoose';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Book.name) private bookModel: Model<Book>,
  ) {}
  async create(payload: CreateOrderDto, user) {
    const book = await this.bookModel.findById(payload.book);

    if (!book) {
      throw new NotFoundException('BookId is not found!');
    }

    const newOrder = await this.orderModel.create({
      user: user.id,
      book: payload.book,
      quantity: payload.quantity,
      address: payload.address,
    });
    return newOrder;
  }

  async findAll() {
    return await this.orderModel.find().populate('book').populate('user');
  }

  async findOne(id: string) {
    const order = await this.orderModel
      .findById(id)
      .populate('book')
      .populate('user');
    if (!order) {
      throw new NotFoundException('Order not found!');
    }
    return order;
  }

  async update(id: string, payload: UpdateOrderDto) {
    await this.findOne(id);
    const book = await this.bookModel.findById(payload.book);
    if (!book) {
      throw new NotFoundException('BookId is not found!');
    }

    const updatedOrder = await this.orderModel.findByIdAndUpdate(id, payload, {
      new: true,
    });
    return updatedOrder;
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.orderModel.findByIdAndDelete(id);
    return 'Order deleted successfully!';
  }
}
