import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './tag.entity';
import { TagsRepository } from './tags.repository';

@Injectable()
export class TagsService {
  constructor(private readonly tagsRepository: TagsRepository) {}

  async createTag(userId: string, createTagDto: CreateTagDto): Promise<Tag> {
    const newTag = {
      ...createTagDto,
      userId,
    };
    return this.tagsRepository.createTag(newTag);
  }

  async getTags(userId: string): Promise<Tag[]> {
    return this.tagsRepository.findByUserId(userId);
  }

  async getTag(id: string, userId: string): Promise<Tag> {
    const tag = await this.tagsRepository.findById(id);
    if (!tag || tag.userId !== userId) {
      throw new NotFoundException(`Tag with ID "${id}" not found`);
    }
    return tag;
  }

  async updateTag(
    id: string,
    userId: string,
    updateTagDto: UpdateTagDto,
  ): Promise<Tag> {
    const tag = await this.tagsRepository.findById(id);
    if (!tag || tag.userId !== userId) {
      throw new NotFoundException(`Tag with ID "${id}" not found`);
    }

    return this.tagsRepository.updateTag(id, updateTagDto);
  }

  async deleteTag(id: string, userId: string): Promise<void> {
    const tag = await this.tagsRepository.findById(id);
    if (!tag || tag.userId !== userId) {
      throw new NotFoundException(`Tag with ID "${id}" not found`);
    }

    await this.tagsRepository.deleteTag(id);
  }
}
