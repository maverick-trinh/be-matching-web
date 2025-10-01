import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';

@Injectable()
export class PhotosService {
  constructor(
    private prisma: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async create(createPhotoDto: CreatePhotoDto, file: string) {
    const { url, publicId } = await this.cloudinaryService.uploadImage(file);
    const photo = await this.prisma.photo.create({
      data: {
        ...createPhotoDto,
        url,
        publicId,
      },
      include: {
        member: true,
      },
    });
    return photo;
  }

  async findAll() {
    return this.prisma.photo.findMany({
      include: {
        member: true,
      },
    });
  }

  async findOne(id: string) {
    const photo = await this.prisma.photo.findUnique({
      where: { id },
      include: {
        member: true,
      },
    });

    if (!photo) {
      throw new NotFoundException(`Photo with ID ${id} not found`);
    }

    return photo;
  }

  async update(id: string, updatePhotoDto: UpdatePhotoDto, file?: string) {
    const photo = await this.findOne(id);
    let url = photo.url;
    let publicId = photo.publicId;

    if (file && photo.publicId) {
      const result = await this.cloudinaryService.updateImage(
        photo.publicId,
        file,
      );
      url = result.url;
      publicId = result.publicId;
    }

    return this.prisma.photo.update({
      where: { id },
      data: {
        ...updatePhotoDto,
        url,
        publicId,
      },
      include: {
        member: true,
      },
    });
  }

  async remove(id: string) {
    const photo = await this.findOne(id);
    if (photo.publicId) {
      await this.cloudinaryService.deleteImage(photo.publicId);
    }
    return this.prisma.photo.delete({
      where: { id },
    });
  }
}
