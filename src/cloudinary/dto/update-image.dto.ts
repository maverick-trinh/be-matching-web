import { IsString, IsOptional } from 'class-validator';

export class UpdateImageDto {
  @IsOptional()
  @IsString()
  public readonly publicId?: string;

  @IsOptional()
  @IsString()
  public readonly url?: string;

  @IsOptional()
  @IsString()
  public readonly title?: string;

  @IsOptional()
  @IsString()
  public readonly description?: string;
}
