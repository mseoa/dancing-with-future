import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({ data: createUserDto });
  }

  findAll() {
    return this.prisma.user.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async findUserById(id: number) {
    const user = await this.prisma.user.findFirst({
      where: { id },
      include: {
        images: true, // Image와 관련된 정보를 가져오도록 설정
        animations: true, // Animation과 관련된 정보를 가져오도록 설정
      },
    });
    return user;
  }

  findUserByName(name: string) {
    return this.prisma.user.findMany({
      where: {
        name: {
          equals: name,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        images: true, // Image와 관련된 정보를 가져오도록 설정
        animations: true, // Animation과 관련된 정보를 가져오도록 설정
      },
    });
  }

  findStateOneUser() {
    return this.prisma.user.findFirst({
      where: {
        state: 1,
      },
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        images: true, // Image와 관련된 정보를 가져오도록 설정
        animations: true, // Animation과 관련된 정보를 가져오도록 설정
      },
    });
  }

  findStateTwoUser() {
    return this.prisma.user.findFirst({
      where: {
        state: 2,
      },
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        images: true, // Image와 관련된 정보를 가져오도록 설정
        animations: true, // Animation과 관련된 정보를 가져오도록 설정
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserDto,
      include: {
        images: true, // Image와 관련된 정보를 가져오도록 설정
        animations: true, // Animation과 관련된 정보를 가져오도록 설정
      },
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
