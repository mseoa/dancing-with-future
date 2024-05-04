import { IsNumber, IsString } from 'class-validator';

export class CreateAnimationDto {
  @IsNumber()
  userId: number;

  @IsString()
  url: string;
}
