import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Author } from 'src/models';
import { Model } from 'mongoose';

@Injectable()
export class AuthorsService {
  constructor(@InjectModel(Author.name) private authorModel: Model<Author>) {}
  async create(payload: CreateAuthorDto) {
    const newAuthor = await this.authorModel.create({
      fullname: payload.fullname,
      biography: payload.biography,
      age: payload.age,
    });
    return newAuthor;
  }

  async findAll() {
    return await this.authorModel.find();
  }

  async findOne(id: string) {
    const author = await this.authorModel.findById(id);
    if (!author) {
      throw new NotFoundException('Author not found');
    }
    return author;
  }

  async update(id: string, payload: UpdateAuthorDto) {
    await this.findOne(id);
    const updatedAuthor = await this.authorModel.findByIdAndUpdate(
      id,
      payload,
      { new: true },
    );
    return updatedAuthor;
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.authorModel.findByIdAndDelete(id);
    return 'Author removed successfully';
  }
}
