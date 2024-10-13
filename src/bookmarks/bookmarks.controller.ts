import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth0JwtGuard } from '../auth/auth0-jwt.guard';
import { Bookmark } from './bookmark.entity';
import { BookmarksService } from './bookmarks.service';
import { BookmarkResponseDto } from './dto/bookmark-response.dto';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';

@ApiTags('bookmarks')
@Controller('bookmarks')
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @Post()
  @UseGuards(Auth0JwtGuard)
  @ApiOperation({
    summary: 'Create a new bookmark',
    operationId: 'createBookmark',
  })
  async createBookmark(
    @Body() createBookmarkDto: CreateBookmarkDto,
  ): Promise<Bookmark> {
    return this.bookmarksService.createBookmark(createBookmarkDto);
  }

  @Get('search')
  @ApiOperation({
    summary: 'Search bookmarks',
    operationId: 'searchBookmarks',
  })
  async searchBookmarks(@Query('q') query: string): Promise<Bookmark[]> {
    return this.bookmarksService.searchBookmarks(query);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a specific bookmark',
    operationId: 'getBookmark',
  })
  @ApiResponse({
    status: 200,
    description: 'The found bookmark',
    type: BookmarkResponseDto,
  })
  async getBookmark(@Param('id') id: string): Promise<BookmarkResponseDto> {
    const bookmark = await this.bookmarksService.getBookmark(id);
    return new BookmarkResponseDto(bookmark);
  }

  @Put(':id')
  @UseGuards(Auth0JwtGuard)
  @ApiOperation({
    summary: 'Update a bookmark',
    operationId: 'updateBookmark',
  })
  async updateBookmark(
    @Param('id') id: string,
    @Body() updateBookmarkDto: UpdateBookmarkDto,
  ): Promise<Bookmark> {
    return this.bookmarksService.updateBookmark(id, updateBookmarkDto);
  }

  @Delete(':id')
  @UseGuards(Auth0JwtGuard)
  @ApiOperation({
    summary: 'Delete a bookmark',
    operationId: 'deleteBookmark',
  })
  async deleteBookmark(@Param('id') id: string): Promise<void> {
    return this.bookmarksService.deleteBookmark(id);
  }
}
