import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty() // 확인 필요
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional() // 확인 필요
  @IsEmail()
  @ApiProperty({ required: false })
  email?: string;

  @IsString()
  @IsOptional() // 확인 필요
  @ApiProperty({ required: false })
  message?: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ default: -1 })
  model1: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ default: -1 })
  model2: number;

  @IsString()
  @IsOptional() // 확인 필요
  @ApiProperty({ required: false })
  language?: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ default: -1 })
  state: number;
}

// export class CurrentUserDto {
//   @IsString()
//   @IsNotEmpty() // 확인 필요
//   @ApiProperty()
//   name: string;

//   @IsString()
//   @IsOptional() // 확인 필요
//   @IsEmail()
//   @ApiProperty({ required: false })
//   email?: string;

//   @IsString()
//   @IsOptional() // 확인 필요
//   @ApiProperty({ required: false })
//   message?: string;

//   @IsNumber()
//   @IsNotEmpty()
//   @ApiProperty({ default: -1 })
//   model1: number;

//   @IsNumber()
//   @IsNotEmpty()
//   @ApiProperty({ default: -1 })
//   model2: number;

//   @IsString()
//   @IsOptional() // 확인 필요
//   @ApiProperty({ required: false })
//   language?: string;

//   @IsNumber()
//   @IsNotEmpty()
//   @ApiProperty({ default: -1 })
//   state: number;

//   @IsString()
//   time: string;
// }
