import { Module } from '@nestjs/common';
import { AnimationService } from './animation.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { S3Module } from 'src/s3/s3.module';
import { AnimationRepository } from './repositories/animation.repository';

@Module({
  controllers: [],
  providers: [AnimationService, AnimationRepository],
  exports: [AnimationService],
  imports: [PrismaModule, S3Module],
})
export class AnimationModule {}
