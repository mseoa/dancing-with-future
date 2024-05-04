import { IsNumber, IsString } from 'class-validator';

export class CreateImageDto {
  @IsNumber()
  userId: number;

  @IsString()
  url: string;
}
