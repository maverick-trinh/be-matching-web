import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MembersService {
  constructor(private prisma: PrismaService) {}

  async create(createMemberDto: CreateMemberDto) {
    return await this.prisma.member.create({
      data: {
        ...createMemberDto,
        dateOfBirth: new Date(createMemberDto.dateOfBirth),
      },
      include: {
        user: true,
        photos: true,
      },
    });
  }

  async findAll() {
    return this.prisma.member.findMany({
      include: {
        user: true,
        photos: true,
      },
    });
  }

  async findOne(id: string) {
    const member = await this.prisma.member.findUnique({
      where: { id },
      include: {
        user: true,
        photos: true,
        sourceLikes: true,
        targetLikes: true,
      },
    });

    if (!member) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }

    return member;
  }

  async update(id: string, updateMemberDto: UpdateMemberDto) {
    await this.findOne(id);

    const { dateOfBirth, ...rest } = updateMemberDto;
    const data = {
      ...rest,
      ...(dateOfBirth && { dateOfBirth: new Date(dateOfBirth) }),
    };

    if (updateMemberDto.dateOfBirth) {
      data.dateOfBirth = new Date(updateMemberDto.dateOfBirth);
    }
    return this.prisma.member.update({
      where: { id },
      data,
      include: {
        user: true,
        photos: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.member.delete({
      where: { id },
    });
  }
}
