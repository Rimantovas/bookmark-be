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
  @ApiProperty({ required: true })
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
  @IsUUID(undefined)
  appId?: string;

  @ApiProperty({ required: true })
  @IsUUID(undefined)
  collectionId?: string;

  @IsObject()
  @IsOptional()
  @ApiProperty({ required: false })
  metadata?: Record<string, any>;
}
