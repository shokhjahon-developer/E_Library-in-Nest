import { ApiProperty } from '@nestjs/swagger';
import { IsISBN, IsNotEmpty, IsString } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ example: 'Limitless' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Someone' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: '66c2483d9da95bb6c0967a49' })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({ example: '5454542551' })
  @IsISBN()
  @IsNotEmpty()
  isbn: string;
}
