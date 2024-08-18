import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Book } from './books.model';
import { User } from './users.model';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Book' })
  book: Book;

  @Prop({ required: true })
  quantity: string;

  @Prop({ required: true })
  address: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
