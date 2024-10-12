import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateCollectionDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsBoolean()
  @IsOptional()
  private?: boolean;
}
