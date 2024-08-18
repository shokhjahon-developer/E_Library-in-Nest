import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Author, Book } from 'src/models';
import { Model } from 'mongoose';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<Book>,
    @InjectModel(Author.name) private authorModel: Model<Author>,
  ) {}
  async create(payload: CreateBookDto) {
    const author = await this.authorModel.findById(payload.author);
    if (!author) {
      throw new NotFoundException('Author not found');
    }
    const newBook = await this.bookModel.create({
      title: payload.title,
      description: payload.description,
      author: author,
      isbn: payload.isbn,
    });
    return newBook;
  }

  async findAll() {
    return await this.bookModel.find().populate('author');
  }

  async findOne(id: string) {
    const book = await this.bookModel.findById(id).populate('author');
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async update(id: string, payload: UpdateBookDto) {
    await this.findOne(id);
    const author = await this.authorModel.findById(payload.author);
    if (!author) {
      throw new NotFoundException('Author not found');
    }
    const updatedBook = await this.bookModel.findByIdAndUpdate(
      id,
      {
        title: payload.title,
        description: payload.description,
        author: payload.author,
        isbn: payload.isbn,
      },
      { new: true },
    );
    return updatedBook;
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.bookModel.findByIdAndDelete(id);
    return 'Book deleted successfully';
  }
}
