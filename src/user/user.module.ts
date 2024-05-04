import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserRepository } from './repositories/user.repository';
import { S3Module } from 'src/s3/s3.module';
import { ImageService } from 'src/image/image.service';
import { ImageModule } from 'src/image/image.module';
import { AnimationModule } from 'src/animation/animation.module';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
  imports: [PrismaModule, S3Module, ImageModule, AnimationModule],
})
export class UserModule {}
