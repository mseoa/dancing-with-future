import { Injectable } from '@nestjs/common';
import { CreateAnimationDto } from './dto/create-animation.dto';
import { UpdateAnimationDto } from './dto/update-animation.dto';
import { AnimationRepository } from './repositories/animation.repository';
import { S3Service } from 'src/s3/s3.service';
import { AnimationEntity } from './entities/animation.entity';

@Injectable()
export class AnimationService {
  constructor(
    private animation: AnimationRepository,
    private s3Service: S3Service,
  ) {}

  async create(userId: number, file: Express.Multer.File) {
    const key = `animations/${file.fieldname}${Date.now()}`;
    const imageUrl = await this.s3Service.uploadFile(file, key);

    const image = await this.animation.create({ userId, url: imageUrl });
    return new AnimationEntity(image);
  }

  findUserAnimation(userId: number, animationId: number) {
    return this.animation.findUserAnimation(userId, animationId);
  }

  findAll() {
    return `This action returns all animation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} animation`;
  }

  update(id: number, updateAnimationDto: UpdateAnimationDto) {
    return `This action updates a #${id} animation`;
  }

  async remove(userId: number, animationUrls: string[]) {
    await this.s3Service.deleteFiles(animationUrls);
    await this.animation.deleteAllByuserId(userId);
  }
}
