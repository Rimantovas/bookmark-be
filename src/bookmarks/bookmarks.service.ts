import { Injectable, NotFoundException } from '@nestjs/common';
import { Bookmark } from './bookmark.entity';
import { BookmarksRepository } from './bookmarks.repository';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';

@Injectable()
export class BookmarksService {
  constructor(private readonly bookmarksRepository: BookmarksRepository) {}

  async createBookmark(
    createBookmarkDto: CreateBookmarkDto,
  ): Promise<Bookmark> {
    return this.bookmarksRepository.createBookmark(createBookmarkDto);
  }

  async getBookmark(id: string): Promise<Bookmark> {
    const bookmark = await this.bookmarksRepository.findById(id);
    if (!bookmark) {
      throw new NotFoundException(`Bookmark with ID "${id}" not found`);
    }
    return bookmark;
  }

  async updateBookmark(
    id: string,
    updateBookmarkDto: UpdateBookmarkDto,
  ): Promise<Bookmark> {
    const bookmark = await this.getBookmark(id);
    return this.bookmarksRepository.updateBookmark(id, {
      ...bookmark,
      ...updateBookmarkDto,
    });
  }

  async deleteBookmark(id: string): Promise<void> {
    await this.getBookmark(id);
    await this.bookmarksRepository.deleteBookmark(id);
  }

  async searchBookmarks(query: string): Promise<Bookmark[]> {
    return this.bookmarksRepository.searchBookmarks(query);
  }

  async getBookmarksByCollectionId(collectionId: string): Promise<Bookmark[]> {
    return this.bookmarksRepository.findByCollectionId(collectionId);
  }
}
