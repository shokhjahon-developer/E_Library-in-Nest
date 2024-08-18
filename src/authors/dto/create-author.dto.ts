import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAuthorDto {
  @ApiProperty({ example: 'Robert Kiyosaki' })
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @ApiProperty({ example: 'Something about this author' })
  @IsString()
  @IsNotEmpty()
  biography: string;

  @ApiProperty({ example: 57 })
  @IsNumber()
  @IsNotEmpty()
  age: number;
}
