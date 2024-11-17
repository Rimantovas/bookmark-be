import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { SearchPaginationDto } from '../shared/dto/search-pagination.dto';
import { Collection } from './collection.entity';

@Injectable()
export class CollectionsRepository extends Repository<Collection> {
  constructor(private dataSource: DataSource) {
    super(Collection, dataSource.createEntityManager());
  }

  async findById(id: string): Promise<Collection | null> {
    return this.findOne({ where: { id } });
  }

  async findByUserId(userId: string): Promise<Collection[]> {
    return this.find({ where: { userId } });
  }

  async createCollection(collection: Partial<Collection>): Promise<Collection> {
    const newCollection = this.create(collection);
    return this.save(newCollection);
  }

  async updateCollection(
    id: string,
    collection: Partial<Collection>,
  ): Promise<Collection> {
    await this.update(id, collection);
    const updatedCollection = await this.findById(id);
    if (!updatedCollection) {
      throw new Error('Collection not found');
    }
    return updatedCollection;
  }

  async deleteCollection(id: string): Promise<void> {
    const collection = await this.findOne({
      where: { id },
      relations: ['bookmarks', 'bookmarks.tags'],
    });
    if (!collection) {
      throw new NotFoundException(`Collection with ID "${id}" not found`);
    }
    await this.remove(collection);
  }

  async searchCollections(
    searchParams: SearchPaginationDto,
    userId?: string,
  ): Promise<Collection[]> {
    const { query, page, limit } = searchParams;
    const queryBuilder = this.createQueryBuilder('collection');
    if (userId) {
      queryBuilder.where(
        '(collection.private = :isPrivate OR collection.userId = :userId)',
        {
          isPrivate: false,
          userId,
        },
      );
    } else {
      queryBuilder.where('collection.private = :isPrivate', {
        isPrivate: false,
      });
    }

    if (query) {
      queryBuilder.andWhere('collection.title ILIKE :query', {
        query: `%${query}%`,
      });
    }

    queryBuilder
      .addOrderBy('collection.createdAt', 'DESC')
      .addOrderBy('collection.updatedAt', 'DESC')
      .skip(((page ?? 1) - 1) * (limit ?? 10))
      .take(limit ?? 10);

    return queryBuilder.getMany();
  }
}
