import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';

@ApiTags('likes')
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a like (swipe right)' })
  @ApiResponse({ status: 201, description: 'Like created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body(ValidationPipe) createLikeDto: CreateLikeDto) {
    return this.likesService.create(createLikeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all likes' })
  @ApiResponse({ status: 200, description: 'List of all likes' })
  findAll() {
    return this.likesService.findAll();
  }

  @Get(':sourceUserId/:targetUserId')
  @ApiOperation({ summary: 'Check if a like exists between two users' })
  @ApiResponse({ status: 200, description: 'Like found' })
  @ApiResponse({ status: 404, description: 'Like not found' })
  findOne(
    @Param('sourceUserId') sourceUserId: string,
    @Param('targetUserId') targetUserId: string,
  ) {
    return this.likesService.findOne(sourceUserId, targetUserId);
  }

  @Delete(':sourceUserId/:targetUserId')
  @ApiOperation({ summary: 'Remove a like (unlike)' })
  @ApiResponse({ status: 200, description: 'Like removed successfully' })
  @ApiResponse({ status: 404, description: 'Like not found' })
  remove(
    @Param('sourceUserId') sourceUserId: string,
    @Param('targetUserId') targetUserId: string,
  ) {
    return this.likesService.remove(sourceUserId, targetUserId);
  }
}
