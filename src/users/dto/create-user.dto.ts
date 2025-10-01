import { IsEmail, IsOptional, IsString, IsBoolean, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({ required: false, description: 'User name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false, description: 'User email address' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false, description: 'User profile image URL' })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({ required: false, default: false, description: 'Whether the profile is complete' })
  @IsOptional()
  @IsBoolean()
  profileComplete?: boolean;

  @ApiProperty({ required: false, enum: Role, default: Role.MEMBER, description: 'User role' })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
