import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
} from '@nestjs/swagger';
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';

@ApiTags('photos')
@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload a new photo' })
  @ApiResponse({ status: 201, description: 'Photo uploaded successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(
    @Body(ValidationPipe) createPhotoDto: CreatePhotoDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // Convert file buffer to base64 string for cloudinary
    const fileStr = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
    return this.photosService.create(createPhotoDto, fileStr);
  }

  @Get()
  @ApiOperation({ summary: 'Get all photos' })
  @ApiResponse({ status: 200, description: 'List of all photos' })
  findAll() {
    return this.photosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get photo by ID' })
  @ApiResponse({ status: 200, description: 'Photo found' })
  @ApiResponse({ status: 404, description: 'Photo not found' })
  findOne(@Param('id') id: string) {
    return this.photosService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update photo' })
  @ApiResponse({ status: 200, description: 'Photo updated successfully' })
  @ApiResponse({ status: 404, description: 'Photo not found' })
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updatePhotoDto: UpdatePhotoDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const fileStr = file
      ? `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
      : undefined;
    return this.photosService.update(id, updatePhotoDto, fileStr);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete photo' })
  @ApiResponse({ status: 200, description: 'Photo deleted successfully' })
  @ApiResponse({ status: 404, description: 'Photo not found' })
  remove(@Param('id') id: string) {
    return this.photosService.remove(id);
  }
}
