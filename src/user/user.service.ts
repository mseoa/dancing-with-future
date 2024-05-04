import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository';
import * as moment from 'moment-timezone';
import { S3Service } from 'src/s3/s3.service';
import { ImageService } from 'src/image/image.service';
import { UserEntity } from './entities/user.entity';
import { AnimationService } from 'src/animation/animation.service';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    private user: UserRepository,
    private imageService: ImageService,
    private animationService: AnimationService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.user.create(createUserDto);

    return new UserEntity(user);
  }

  async findAll() {
    const users = await this.user.findAll();

    const modifiedUsers = users.map((user) => new UserEntity(user));

    return modifiedUsers;
  }

  async findOne(id: number) {
    const user = await this.user.findUserById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return new UserEntity(user);
  }

  async findUserImage(userId: number, imageId: number) {
    const image = await this.imageService.findUserImage(userId, imageId);
    if (!image) {
      throw new NotFoundException('No Image found');
    }

    return image;
  }

  async findUserAnimation(userId: number, animationId: number) {
    const animation = await this.animationService.findUserAnimation(
      userId,
      animationId,
    );
    if (!animation) {
      throw new NotFoundException('No Animation found');
    }

    return animation;
  }

  async findUserByName(name: string) {
    const users = await this.user.findUserByName(name);

    const modifiedUsers = users.map((user) => new UserEntity(user));

    return modifiedUsers;
  }

  async findStateOneUser() {
    const user = await this.user.findStateOneUser();

    if (!user) {
      throw new NotFoundException('state가 1인 유저가 없습니다.');
    }

    return new UserEntity(user);
  }

  async findStateTwoUser() {
    const user = await this.user.findStateTwoUser();

    if (!user) {
      throw new NotFoundException('state가 2인 유저가 없습니다.');
    }

    return new UserEntity(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);
    const user = await this.user.update(id, updateUserDto);

    return new UserEntity(user);
  }

  async updateImage(id: number, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('이미지 첨부 안됨');
    }
    await this.findOne(id);

    return this.imageService.create(id, file);
  }

  async updateAnimation(id: number, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('애니메이션 파일 첨부 안됨');
    }
    await this.findOne(id);

    return this.animationService.create(id, file);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    const imageUrls = user?.images.map((image) => image.url);
    const annimationUrls = user?.animations.map((anim) => anim.url);

    const imageRemovalPromise = this.imageService.remove(id, imageUrls);
    const animationRemovalPromise = this.animationService.remove(
      id,
      annimationUrls,
    );

    await Promise.all([imageRemovalPromise, animationRemovalPromise]);

    return await this.user.remove(id);
  }
}
