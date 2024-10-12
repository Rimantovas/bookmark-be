import {
  IsArray,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateBookmarkDto {
  @IsString()
  @IsOptional()
  link?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  image_url?: string;

  @IsArray()
  @IsUUID(4, { each: true })
  @IsOptional()
  tagIds?: string[];

  @IsUUID(4)
  @IsOptional()
  appId?: string;

  @IsUUID(4)
  @IsOptional()
  collectionId?: string;

  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;
}
