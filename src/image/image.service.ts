import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { ImageRepository } from './repositories/image.repository';
import { ImageEntity } from './entities/image.entity';
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export class ImageService {
  constructor(
    private image: ImageRepository,
    private s3Service: S3Service,
  ) {}

  async create(userId: number, file: Express.Multer.File) {
    const key = `images/${file.fieldname}${Date.now()}`;
    const imageUrl = await this.s3Service.uploadFile(file, key);

    const image = await this.image.create({ userId, url: imageUrl });
    return new ImageEntity(image);
  }

  async findAllByUserId(userId: number) {
    await this.image.findAllByUserId(userId);
  }

  findUserImage(userId: number, imageId: number) {
    return this.image.findUserImage(userId, imageId);
  }

  findAll() {
    return `This action returns all image`;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  async remove(userId: number, imageUrls: string[]) {
    await this.s3Service.deleteFiles(imageUrls);
    await this.image.deleteAllByuserId(userId);
  }
}
