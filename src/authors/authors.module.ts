import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Author, AuthorSchema } from 'src/models';

@Module({
  controllers: [AuthorsController],
  providers: [AuthorsService],
  imports: [
    MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }]),
  ],
  exports: [
    MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }]),
  ],
})
export class AuthorsModule {}
