import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAnimationDto } from '../dto/create-animation.dto';

@Injectable()
export class AnimationRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(createAnimationDto: CreateAnimationDto) {
    return this.prisma.animation.create({ data: createAnimationDto });
  }

  findAllByUserId(userId: number) {
    return this.prisma.animation.findMany({
      where: { userId },
    });
  }

  findUserAnimation(userId: number, animationId: number) {
    return this.prisma.animation.findFirst({
      where: { id: animationId, userId },
    });
  }

  deleteAllByuserId(userId: number) {
    return this.prisma.animation.deleteMany({
      where: { userId },
    });
  }
}
