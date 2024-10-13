import { ApiProperty } from '@nestjs/swagger';
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

  @ApiProperty({ type: [String], description: 'Array of tag IDs' })
  tagIds: string[];

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
    this.tagIds = bookmark.tags?.map((tag) => tag.id) || [];
    this.appId = bookmark.app?.id;
    this.collectionId = bookmark.collection?.id;
    this.metadata = bookmark.metadata;
    this.createdAt = bookmark.createdAt;
    this.updatedAt = bookmark.updatedAt;
  }
}
