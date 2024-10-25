import { Injectable, NotFoundException } from '@nestjs/common';
import { SearchPaginationDto } from '../shared/dto/search-pagination.dto';
import { Collection } from './collection.entity';
import { CollectionsRepository } from './collections.repository';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@Injectable()
export class CollectionsService {
  constructor(private readonly collectionsRepository: CollectionsRepository) {}

  async createCollection(
    userId: string,
    createCollectionDto: CreateCollectionDto,
  ): Promise<Collection> {
    const newCollection = {
      ...createCollectionDto,
      userId,
    };
    return this.collectionsRepository.createCollection(newCollection);
  }

  async getCollections(userId: string): Promise<Collection[]> {
    return this.collectionsRepository.findByUserId(userId);
  }

  async getCollection(
    id: string,
    userId: string | undefined,
  ): Promise<Collection> {
    const collection = await this.collectionsRepository.findById(id);
    if (!collection || (collection.private && collection.userId !== userId)) {
      throw new NotFoundException(`Collection with ID "${id}" not found`);
    }
    return collection;
  }

  async updateCollection(
    id: string,
    updateCollectionDto: UpdateCollectionDto,
    userId: string | undefined,
  ): Promise<Collection> {
    const collection = await this.getCollection(id, userId);
    return this.collectionsRepository.updateCollection(id, {
      ...collection,
      ...updateCollectionDto,
    });
  }

  async deleteCollection(
    id: string,
    userId: string | undefined,
  ): Promise<void> {
    await this.getCollection(id, userId);
    await this.collectionsRepository.deleteCollection(id);
  }

  async searchCollections(
    searchParams: SearchPaginationDto,
  ): Promise<Collection[]> {
    return this.collectionsRepository.searchCollections(searchParams);
  }
}
