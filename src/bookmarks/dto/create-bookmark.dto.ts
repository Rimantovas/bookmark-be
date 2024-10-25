import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateBookmarkDto {
  @IsString()
  @ApiProperty()
  link: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  title?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  description?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  image_url?: string;

  @IsArray()
  @IsOptional()
  @ApiProperty({ required: false })
  tagIds?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  appId?: string;

  @ApiProperty({ required: false })
  collectionId?: string;

  @IsObject()
  @IsOptional()
  @ApiProperty({ required: false })
  metadata?: Record<string, any>;
}
