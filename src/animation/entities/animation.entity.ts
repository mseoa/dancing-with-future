import { ApiProperty } from '@nestjs/swagger';
import { Animation } from '@prisma/client';
import { Transform } from 'class-transformer';
import * as moment from 'moment-timezone';

export class AnimationEntity implements Animation {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  url: string;

  @ApiProperty()
  @Transform(({ value }) => moment(value).format('YYYY-MM-DD HH:mm:ss'))
  createdAt: Date;

  @ApiProperty()
  @Transform(({ value }) => moment(value).format('YYYY-MM-DD HH:mm:ss'))
  updatedAt: Date;

  constructor(entity: Animation) {
    Object.assign(this, entity);
  }
}
