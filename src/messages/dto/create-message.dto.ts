import { IsString, IsOptional, IsDateString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({ description: 'Message text content' })
  @IsString()
  text: string;

  @ApiProperty({ required: false, description: 'Sender user ID' })
  @IsOptional()
  @IsString()
  senderId?: string;

  @ApiProperty({ required: false, description: 'Recipient user ID' })
  @IsOptional()
  @IsString()
  recipientId?: string;

  @ApiProperty({
    required: false,
    description: 'Date when message was read',
    example: '2025-10-01T10:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  dateRead?: string;

  @ApiProperty({
    required: false,
    default: false,
    description: 'Whether sender has deleted this message',
  })
  @IsOptional()
  @IsBoolean()
  senderDeleted?: boolean;

  @ApiProperty({
    required: false,
    default: false,
    description: 'Whether recipient has deleted this message',
  })
  @IsOptional()
  @IsBoolean()
  recipientDeleted?: boolean;
}
