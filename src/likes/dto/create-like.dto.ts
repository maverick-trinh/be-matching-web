import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLikeDto {
  @ApiProperty({ description: 'User ID who is giving the like' })
  @IsString()
  sourceUserId: string;

  @ApiProperty({ description: 'User ID who is receiving the like' })
  @IsString()
  targetUserId: string;
}
