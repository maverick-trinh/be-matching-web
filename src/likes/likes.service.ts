import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLikeDto } from './dto/create-like.dto';

@Injectable()
export class LikesService {
  constructor(private prisma: PrismaService) {}

  async create(createLikeDto: CreateLikeDto) {
    return this.prisma.like.create({
      data: createLikeDto,
      include: {
        sourceMember: true,
        targetMember: true,
      },
    });
  }

  async findAll() {
    return this.prisma.like.findMany({
      include: {
        sourceMember: true,
        targetMember: true,
      },
    });
  }

  async findOne(sourceUserId: string, targetUserId: string) {
    const like = await this.prisma.like.findUnique({
      where: {
        sourceUserId_targetUserId: {
          sourceUserId,
          targetUserId,
        },
      },
      include: {
        sourceMember: true,
        targetMember: true,
      },
    });

    if (!like) {
      throw new NotFoundException(
        `Like from ${sourceUserId} to ${targetUserId} not found`,
      );
    }

    return like;
  }

  async remove(sourceUserId: string, targetUserId: string) {
    await this.findOne(sourceUserId, targetUserId);
    return this.prisma.like.delete({
      where: {
        sourceUserId_targetUserId: {
          sourceUserId,
          targetUserId,
        },
      },
    });
  }
}
