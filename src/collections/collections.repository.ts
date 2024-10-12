import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
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

  async updateCollection(id: string, collection: Partial<Collection>): Promise<Collection> {
    await this.update(id, collection);
    const updatedCollection = await this.findById(id);
    if (!updatedCollection) {
      throw new Error('Collection not found');
    }
    return updatedCollection;
  }

  async deleteCollection(id: string): Promise<void> {
    await this.delete(id);
  }
}
