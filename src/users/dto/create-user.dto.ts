import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Alex' })
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @ApiProperty({ example: 'alex' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'alex555' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
