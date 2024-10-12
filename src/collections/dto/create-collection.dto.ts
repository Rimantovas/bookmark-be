import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateCollectionDto {
  @IsString()
  title: string;

  @IsBoolean()
  @IsOptional()
  private?: boolean;
}
