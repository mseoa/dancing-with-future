import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageRepository } from './repositories/image.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { S3Module } from 'src/s3/s3.module';

@Module({
  controllers: [],
  providers: [ImageService, ImageRepository],
  exports: [ImageService],
  imports: [PrismaModule, S3Module],
})
export class ImageModule {}
