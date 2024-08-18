import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  user: string;

  @ApiProperty({ example: 'BookID' })
  @IsString()
  @IsNotEmpty()
  book: string;

  @ApiProperty({ example: 4 })
  @IsInt()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ example: 'street 11' })
  @IsString()
  @IsNotEmpty()
  address: string;
}
