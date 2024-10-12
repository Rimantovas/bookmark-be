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
import { Auth0JwtGuard } from '../auth/auth0-jwt.guard';
import { Bookmark } from './bookmark.entity';
import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';

@Controller('bookmarks')
@UseGuards(Auth0JwtGuard)
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @Post()
  async createBookmark(
    @Body() createBookmarkDto: CreateBookmarkDto,
  ): Promise<Bookmark> {
    return this.bookmarksService.createBookmark(createBookmarkDto);
  }

  @Get('search')
  async searchBookmarks(@Query('q') query: string): Promise<Bookmark[]> {
    return this.bookmarksService.searchBookmarks(query);
  }

  @Get(':id')
  async getBookmark(@Param('id') id: string): Promise<Bookmark> {
    return this.bookmarksService.getBookmark(id);
  }

  @Put(':id')
  async updateBookmark(
    @Param('id') id: string,
    @Body() updateBookmarkDto: UpdateBookmarkDto,
  ): Promise<Bookmark> {
    return this.bookmarksService.updateBookmark(id, updateBookmarkDto);
  }

  @Delete(':id')
  async deleteBookmark(@Param('id') id: string): Promise<void> {
    return this.bookmarksService.deleteBookmark(id);
  }
}
