import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  fullname: string;

  @ApiProperty({ example: 'john' })
  @IsString()
  @MaxLength(64)
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'johnpassword55' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  password: string;
}
