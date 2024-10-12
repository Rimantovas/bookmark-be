import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Tag } from './tag.entity';

@Injectable()
export class TagsRepository extends Repository<Tag> {
  constructor(private dataSource: DataSource) {
    super(Tag, dataSource.createEntityManager());
  }

  async findById(id: string): Promise<Tag | null> {
    return this.findOne({ where: { id } });
  }

  async findByUserId(userId: string): Promise<Tag[]> {
    return this.find({ where: { userId } });
  }

  async createTag(tag: Partial<Tag>): Promise<Tag> {
    const newTag = this.create(tag);
    return this.save(newTag);
  }

  async updateTag(id: string, tag: Partial<Tag>): Promise<Tag> {
    await this.update(id, tag);
    const updatedTag = await this.findById(id);
    if (!updatedTag) {
      throw new Error('Tag not found');
    }
    return updatedTag;
  }

  async deleteTag(id: string): Promise<void> {
    await this.delete(id);
  }
}
