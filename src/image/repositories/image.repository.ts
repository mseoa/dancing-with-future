import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateImageDto } from '../dto/create-image.dto';
import { ImageEntity } from '../entities/image.entity';

@Injectable()
export class ImageRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(createImageDto: CreateImageDto) {
    return this.prisma.image.create({ data: createImageDto });
  }

  findAllByUserId(userId: number) {
    return this.prisma.image.findMany({
      where: { userId },
    });
  }

  deleteAllByuserId(userId: number) {
    return this.prisma.image.deleteMany({
      where: { userId },
    });
  }

  findUserImage(userId: number, imageId: number) {
    return this.prisma.image.findFirst({
      where: { id: imageId, userId },
    });
  }
}
