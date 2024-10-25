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
  @IsUUID(undefined, { each: true })
  @IsOptional()
  tagIds?: string[];

  @IsUUID(undefined)
  @IsOptional()
  appId?: string;

  @IsUUID(undefined)
  @IsOptional()
  collectionId?: string;

  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;
}
