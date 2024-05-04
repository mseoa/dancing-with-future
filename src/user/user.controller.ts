import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  @ApiOperation({ summary: '유저 데이터 등록' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  @ApiOperation({ summary: '전체 유저 데이터 나열' })
  findAll() {
    return this.userService.findAll();
  }

  @Get('/filter')
  @ApiOperation({
    summary:
      '해당 name의 유저 데이터 나열, 같은 이름의 유저가 있을 수 있기에 배열 반환',
  })
  @ApiOkResponse({ type: UserEntity, isArray: true })
  findAllByName(@Query('name') name: string) {
    return this.userService.findUserByName(name);
  }

  @Get('/uncalled')
  @ApiOperation({
    summary: 'state의 값이 1인 유저데이터 반환 (파일 데이터 조회 가능)',
  })
  @ApiOkResponse({ type: UserEntity })
  findStateOneUser() {
    return this.userService.findStateOneUser();
  }

  @Get('/unarchived')
  @ApiOperation({
    summary: 'state의 값이 2인 유저데이터 반환 (파일 데이터 조회 가능)',
  })
  @ApiOkResponse({ type: UserEntity })
  findStateTwoUser() {
    return this.userService.findStateTwoUser();
  }

  @Get(':id')
  @ApiOperation({
    summary:
      '해당되는 유저아이디 값의 유저 데이터 나열 (파일 데이터 조회 가능)',
  })
  @ApiOkResponse({ type: UserEntity })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Get(':userId/image/:imageId')
  @ApiOperation({ summary: '유저아이디와 이미지아이디로 특정 이미지 조회' })
  @ApiOkResponse({ type: UserEntity })
  findUserImage(
    @Param('userId', ParseIntPipe) id: number,
    @Param('imageId', ParseIntPipe) imageId: number,
  ) {
    return this.userService.findUserImage(id, imageId);
  }

  @Get(':userId/animation/:animationId')
  @ApiOperation({
    summary: '유저아이디와 애니메이션아이디로 특정 애니메이션파일 조회',
  })
  @ApiOkResponse({ type: UserEntity })
  findUserAnimation(
    @Param('userId', ParseIntPipe) id: number,
    @Param('animationId', ParseIntPipe) animationId: number,
  ) {
    return this.userService.findUserAnimation(id, animationId);
  }

  @Put(':id')
  @ApiOkResponse({ type: UserEntity })
  @ApiOperation({ summary: '해당 user id의 특정 값 수정' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Put(':id/image')
  @ApiOkResponse({ type: UserEntity })
  @ApiOperation({ summary: '이미지 데이터 등록' })
  async updateImage(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.userService.updateImage(id, file);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Put(':id/animation')
  @ApiOperation({ summary: '애니메이션 데이터 등록' })
  @ApiOkResponse({ type: UserEntity })
  updateAnimation(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.updateAnimation(id, file);
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserEntity })
  @ApiOperation({ summary: '해당 유저 아이디의 모든 데이터 삭제' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
