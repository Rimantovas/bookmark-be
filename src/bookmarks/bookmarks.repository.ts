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

  async createBookmark(bookmarkData: Partial<Bookmark>): Promise<Bookmark> {
    const newBookmark = this.create(bookmarkData);
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

    // Merge the updated data
    const updatedBookmark = this.merge(bookmark, bookmarkData);

    // If tags are being updated, we need to handle the many-to-many relationship manually
    if ('tags' in bookmarkData && bookmarkData.tags) {
      updatedBookmark.tags = bookmarkData.tags;
    }

    // Save the updated bookmark
    return this.save(updatedBookmark);
  }

  async deleteBookmark(id: string): Promise<void> {
    const bookmark = await this.findOne({ where: { id }, relations: ['tags'] });
    if (!bookmark) {
      throw new NotFoundException(`Bookmark with ID "${id}" not found`);
    }
    await this.remove(bookmark);
  }

  async searchBookmarks(query: string, userId: string): Promise<Bookmark[]> {
    return this.createQueryBuilder('bookmark')
      .leftJoinAndSelect('bookmark.tags', 'tag')
      .leftJoinAndSelect('bookmark.app', 'app')
      .where('bookmark.title ILIKE :query', { query: `%${query}%` })
      .orWhere('bookmark.description ILIKE :query', { query: `%${query}%` })
      .andWhere('bookmark.userId = :userId', { userId })
      .getMany();
  }
}
