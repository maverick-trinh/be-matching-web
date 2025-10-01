import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';

@Injectable()
export class PhotosService {
  constructor(private prisma: PrismaService) {}

  async create(createPhotoDto: CreatePhotoDto) {
    return this.prisma.photo.create({
      data: createPhotoDto,
      include: {
        member: true,
      },
    });
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

  async update(id: string, updatePhotoDto: UpdatePhotoDto) {
    await this.findOne(id);
    return this.prisma.photo.update({
      where: { id },
      data: updatePhotoDto,
      include: {
        member: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.photo.delete({
      where: { id },
    });
  }
}
