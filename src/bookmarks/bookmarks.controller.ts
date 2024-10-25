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
  @HttpCode(HttpStatus.CREATED)
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
  @HttpCode(HttpStatus.OK)
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
  @HttpCode(HttpStatus.OK)
  async getBookmark(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BookmarkResponseDto> {
    const bookmark = await this.bookmarksService.getBookmark(id);
    return new BookmarkResponseDto(bookmark);
  }

  @Put(':id')
  @UseGuards(Auth0JwtGuard)
  @ApiOperation({
    summary: 'Update a bookmark',
    operationId: 'updateBookmark',
  })
  @HttpCode(HttpStatus.OK)
  async updateBookmark(
    @Param('id', ParseUUIDPipe) id: string,
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
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteBookmark(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.bookmarksService.deleteBookmark(id);
  }
}
