import { IsString, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMemberDto {
  @ApiProperty({ description: 'User ID associated with this member' })
  @IsString()
  userId: string;

  @ApiProperty({ description: 'Member name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Member gender' })
  @IsString()
  gender: string;

  @ApiProperty({ description: 'Member date of birth', example: '1990-01-01' })
  @IsDateString()
  dateOfBirth: string;

  @ApiProperty({ description: 'Member profile description' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Member city' })
  @IsString()
  city: string;

  @ApiProperty({ description: 'Member country' })
  @IsString()
  country: string;

  @ApiProperty({ required: false, description: 'Member profile image URL' })
  @IsOptional()
  @IsString()
  image?: string;
}
