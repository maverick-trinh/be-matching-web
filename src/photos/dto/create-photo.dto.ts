import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePhotoDto {
  @ApiProperty({ description: 'Photo URL' })
  @IsString()
  url: string;

  @ApiProperty({ required: false, description: 'Public ID from cloud storage' })
  @IsOptional()
  @IsString()
  publicId?: string;

  @ApiProperty({
    required: false,
    default: false,
    description: 'Whether the photo is approved',
  })
  @IsOptional()
  @IsBoolean()
  isApproved?: boolean;

  @ApiProperty({ description: 'Member ID who owns this photo' })
  @IsString()
  memberId: string;
}
