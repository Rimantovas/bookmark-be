import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Bookmark } from './bookmark.entity';

@Injectable()
export class BookmarksRepository extends Repository<Bookmark> {
  constructor(private dataSource: DataSource) {
    super(Bookmark, dataSource.createEntityManager());
  }

  async findById(id: string): Promise<Bookmark | null> {
    return this.findOne({
      where: { id },
      relations: ['tags', 'app', 'collection'],
    });
  }

  async findByCollectionId(collectionId: string): Promise<Bookmark[]> {
    return this.find({
      where: { collection: { id: collectionId } },
      relations: ['tags', 'app'],
    });
  }

  async createBookmark(bookmark: Partial<Bookmark>): Promise<Bookmark> {
    const newBookmark = this.create(bookmark);
    return this.save(newBookmark);
  }

  async updateBookmark(
    id: string,
    bookmarkData: Partial<Bookmark>,
  ): Promise<Bookmark> {
    const bookmark = await this.findById(id);
    if (!bookmark) {
      throw new NotFoundException(`Bookmark with ID "${id}" not found`);
    }

    // Handle many-to-many relationship for tags
    if (bookmarkData.tags) {
      bookmark.tags = bookmarkData.tags;
      delete bookmarkData.tags;
    }

    // Update other properties
    Object.assign(bookmark, bookmarkData);

    // Save the updated bookmark
    return this.save(bookmark);
  }

  async deleteBookmark(id: string): Promise<void> {
    await this.delete(id);
  }

  async searchBookmarks(query: string): Promise<Bookmark[]> {
    return this.createQueryBuilder('bookmark')
      .leftJoinAndSelect('bookmark.tags', 'tag')
      .leftJoinAndSelect('bookmark.app', 'app')
      .where('bookmark.title ILIKE :query', { query: `%${query}%` })
      .orWhere('bookmark.description ILIKE :query', { query: `%${query}%` })
      .getMany();
  }
}
