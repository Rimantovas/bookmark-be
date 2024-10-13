import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Auth0JwtGuard } from '../auth/auth0-jwt.guard';
import { GetUser } from '../auth/get-user.decorator';
import { BookmarksService } from '../bookmarks/bookmarks.service';
import { BookmarkResponseDto } from '../bookmarks/dto/bookmark-response.dto';
import { User } from '../users/user.entity';
import { Collection } from './collection.entity';
import { CollectionsService } from './collections.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@ApiTags('collections')
@Controller('collections')
export class CollectionsController {
  constructor(
    private readonly collectionsService: CollectionsService,
    private readonly bookmarksService: BookmarksService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a collection',
    operationId: 'createCollection',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: Collection,
  })
  @UseGuards(Auth0JwtGuard)
  @ApiBearerAuth()
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
  @ApiOperation({
    summary: 'Get all collections for a user',
    operationId: 'getCollections',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Collection,
    isArray: true,
  })
  @UseGuards(Auth0JwtGuard)
  @ApiBearerAuth()
  async getCollections(@GetUser() user: User): Promise<Collection[]> {
    return this.collectionsService.getCollections(user.id);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a specific collection',
    operationId: 'getCollection',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Collection,
  })
  async getCollection(@Param('id') id: string): Promise<Collection> {
    return this.collectionsService.getCollection(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a collection',
    operationId: 'updateCollection',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Collection,
  })
  @UseGuards(Auth0JwtGuard)
  @ApiBearerAuth()
  async updateCollection(
    @Param('id') id: string,
    @Body() updateCollectionDto: UpdateCollectionDto,
  ): Promise<Collection> {
    return this.collectionsService.updateCollection(id, updateCollectionDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a collection',
    operationId: 'deleteCollection',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @UseGuards(Auth0JwtGuard)
  @ApiBearerAuth()
  async deleteCollection(@Param('id') id: string): Promise<void> {
    return this.collectionsService.deleteCollection(id);
  }

  @Get(':id/bookmarks')
  @ApiOperation({
    summary: 'Get all bookmarks in a collection',
    operationId: 'getCollectionBookmarks',
  })
  @ApiResponse({
    status: 200,
    description: 'Array of bookmarks in the collection',
    type: [BookmarkResponseDto],
  })
  async getCollectionBookmarks(
    @Param('id') id: string,
  ): Promise<BookmarkResponseDto[]> {
    const bookmarks =
      await this.bookmarksService.getBookmarksByCollectionId(id);
    return bookmarks.map((bookmark) => new BookmarkResponseDto(bookmark));
  }
}
