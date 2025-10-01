import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UploadImageDto {
  @IsString()
  @IsNotEmpty()
  public readonly image: string;

  @IsString()
  @IsOptional()
  public readonly description?: string;
}
