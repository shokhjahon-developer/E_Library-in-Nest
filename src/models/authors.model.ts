import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthorsDocument = HydratedDocument<Author>;

@Schema()
export class Author {
  @Prop({ required: true })
  fullname: string;

  @Prop({ required: true })
  biography: string;

  @Prop({ required: true })
  age: number;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
