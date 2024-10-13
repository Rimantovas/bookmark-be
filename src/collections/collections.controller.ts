import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth0JwtGuard } from '../auth/auth0-jwt.guard';
import { GetUser } from '../auth/get-user.decorator';
import { Bookmark } from '../bookmarks/bookmark.entity';
import { BookmarksService } from '../bookmarks/bookmarks.service';
import { User } from '../users/user.entity';
import { Collection } from './collection.entity';
import { CollectionsService } from './collections.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@ApiTags('collections')
@Controller('collections')
@UseGuards(Auth0JwtGuard)
export class CollectionsController {
  constructor(
    private readonly collectionsService: CollectionsService,
    private readonly bookmarksService: BookmarksService,
  ) {}

  @Post()
  async createCollection(
    @GetUser() user: User,
    @Body() createCollectionDto: CreateCollectionDto,
  ): Promise<Collection> {
    return this.collectionsService.createCollection(
      user.id,
      createCollectionDto,
    );
  }

  @Get()
  async getCollections(@GetUser() user: User): Promise<Collection[]> {
    return this.collectionsService.getCollections(user.id);
  }

  @Get(':id')
  async getCollection(@Param('id') id: string): Promise<Collection> {
    return this.collectionsService.getCollection(id);
  }

  @Put(':id')
  async updateCollection(
    @Param('id') id: string,
    @Body() updateCollectionDto: UpdateCollectionDto,
  ): Promise<Collection> {
    return this.collectionsService.updateCollection(id, updateCollectionDto);
  }

  @Delete(':id')
  async deleteCollection(@Param('id') id: string): Promise<void> {
    return this.collectionsService.deleteCollection(id);
  }

  @Get(':id/bookmarks')
  async getCollectionBookmarks(@Param('id') id: string): Promise<Bookmark[]> {
    return this.bookmarksService.getBookmarksByCollectionId(id);
  }
}
