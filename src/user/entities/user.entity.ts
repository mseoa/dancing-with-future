import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Transform } from 'class-transformer';
import * as moment from 'moment-timezone';
import { AnimationEntity } from 'src/animation/entities/animation.entity';
import { ImageEntity } from 'src/image/entities/image.entity';

export class UserEntity implements User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false, nullable: true })
  email: string;

  @ApiProperty({ required: false, nullable: true })
  message: string;

  @ApiProperty()
  model1: number;

  @ApiProperty()
  model2: number;

  @ApiProperty({ required: false, nullable: true })
  language: string;

  @ApiProperty()
  state: number;

  @ApiProperty({
    example: '2024-05-04 03:56:31', // 예시로 보여줄 날짜 및 시간
    description: 'Last update date and time',
    type: String, // 데이터 타입 지정
    format: 'date-time', // 날짜와 시간 형식 지정
  })
  @Transform(({ value }) =>
    moment(value).tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss'),
  )
  createdAt: Date;

  @ApiProperty({
    example: '2024-05-04 03:56:31', // 예시로 보여줄 날짜 및 시간
    description: 'Last update date and time',
    type: String, // 데이터 타입 지정
    format: 'date-time', // 날짜와 시간 형식 지정
  })
  @Transform(({ value }) =>
    moment(value).tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss'),
  )
  updatedAt: Date;

  @ApiProperty()
  animations: Array<AnimationEntity>;

  @ApiProperty()
  images: Array<ImageEntity>;

  constructor(entity: User) {
    Object.assign(this, entity);
  }
}
