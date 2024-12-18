import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetUserOptional } from 'src/auth/get-user-optional.decorator';
import { Bookmark } from 'src/bookmarks/bookmark.entity';
import { SearchPaginationDto } from 'src/shared/dto/search-pagination.dto';
import { Auth0JwtGuard } from '../auth/auth0-jwt.guard';
import { GetUser } from '../auth/get-user.decorator';
import { BookmarksService } from '../bookmarks/bookmarks.service';
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
  @HttpCode(HttpStatus.CREATED)
  async createCollection(
    @GetUser() user: Promise<User>,
    @Body() createCollectionDto: CreateCollectionDto,
  ): Promise<Collection> {
    const resolvedUser = await user;
    console.log('CollectionsController: createCollection called', {
      user: resolvedUser,
      createCollectionDto,
    });
    return this.collectionsService.createCollection(
      resolvedUser.id,
      createCollectionDto,
    );
  }

  @Get('search')
  @ApiOperation({
    summary: 'Search public collections',
    operationId: 'searchCollections',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [Collection],
  })
  async searchCollections(
    @Query() searchParams: SearchPaginationDto,
    @GetUserOptional() user: Promise<User | null>,
  ): Promise<Collection[]> {
    const resolvedUser = await user;
    return this.collectionsService.searchCollections(
      searchParams,
      resolvedUser?.id,
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
  @HttpCode(HttpStatus.OK)
  async getCollections(@GetUser() user: User): Promise<Collection[]> {
    console.log('CollectionsController: getCollections called', { user });
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
  @HttpCode(HttpStatus.OK)
  async getCollection(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUserOptional() user: Promise<User | null>,
  ): Promise<Collection> {
    const resolvedUser = await user;
    const collection = await this.collectionsService.getCollection(
      id,
      resolvedUser?.id,
    );

    return collection;
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
  @HttpCode(HttpStatus.OK)
  async updateCollection(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCollectionDto: UpdateCollectionDto,
    @GetUser() user: Promise<User>,
  ): Promise<Collection> {
    const resolvedUser = await user;
    return this.collectionsService.updateCollection(
      id,
      updateCollectionDto,
      resolvedUser.id,
    );
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
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCollection(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: Promise<User>,
  ): Promise<void> {
    const resolvedUser = await user;
    return this.collectionsService.deleteCollection(id, resolvedUser.id);
  }

  @Get(':id/bookmarks')
  @ApiOperation({
    summary: 'Get all bookmarks in a collection',
    operationId: 'getCollectionBookmarks',
  })
  @ApiResponse({
    status: 200,
    description: 'Array of bookmarks in the collection',
    type: [Bookmark],
  })
  @HttpCode(HttpStatus.OK)
  async getCollectionBookmarks(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUserOptional() user: Promise<User | null>,
  ): Promise<Bookmark[]> {
    const resolvedUser = await user;
    return await this.bookmarksService.getBookmarksByCollectionId(
      id,
      resolvedUser,
    );
  }
}
