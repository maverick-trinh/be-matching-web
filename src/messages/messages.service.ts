import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async create(createMessageDto: CreateMessageDto) {
    const { dateRead, ...rest } = createMessageDto;
    const data = {
      ...rest,
      ...(dateRead && { dateRead: new Date(dateRead) }),
    };
    return this.prisma.message.create({
      data,
      include: {
        sender: true,
        recipient: true,
      },
    });
  }

  async findAll() {
    return this.prisma.message.findMany({
      include: {
        sender: true,
        recipient: true,
      },
    });
  }

  async findOne(id: string) {
    const message = await this.prisma.message.findUnique({
      where: { id },
      include: {
        sender: true,
        recipient: true,
      },
    });

    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }

    return message;
  }

  async update(id: string, updateMessageDto: UpdateMessageDto) {
    await this.findOne(id);
    const { dateRead, ...rest } = updateMessageDto;
    const data = {
      ...rest,
      ...(dateRead && { dateRead: new Date(dateRead) }),
    };
    return this.prisma.message.update({
      where: { id },
      data,
      include: {
        sender: true,
        recipient: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.message.delete({
      where: { id },
    });
  }
}
