import { ApiProperty } from '@nestjs/swagger';
import { Tag } from '../../tags/tag.entity';
import { Bookmark } from '../bookmark.entity';

export class BookmarkResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  link: string;

  @ApiProperty({ required: false })
  title?: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: false })
  image_url?: string;

  @ApiProperty({ type: [Tag], description: 'Array of tag objects' })
  tags: Tag[];

  @ApiProperty({ type: String, required: false, description: 'Social app ID' })
  appId?: string;

  @ApiProperty({ type: String, required: false })
  collectionId?: string;

  @ApiProperty({ type: Object, required: false })
  metadata: Record<string, any>;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(bookmark: Bookmark) {
    this.id = bookmark.id;
    this.link = bookmark.link;
    this.title = bookmark.title;
    this.description = bookmark.description;
    this.image_url = bookmark.image_url;
    this.tags = bookmark.tags || [];
    this.appId = bookmark.app?.id;
    this.collectionId = bookmark.collection?.id;
    this.metadata = bookmark.metadata;
    this.createdAt = bookmark.createdAt;
    this.updatedAt = bookmark.updatedAt;
  }
}
