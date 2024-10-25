import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

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
  @IsUUID(undefined, { each: true })
  @IsOptional()
  @ApiProperty({ required: false })
  tagIds?: string[];

  @IsOptional()
  @ApiProperty({ required: false })
  @IsUUID(undefined, { each: true })
  appId?: string;

  @ApiProperty({ required: false })
  @IsUUID(undefined, { each: true })
  collectionId?: string;

  @IsObject()
  @IsOptional()
  @ApiProperty({ required: false })
  metadata?: Record<string, any>;
}
