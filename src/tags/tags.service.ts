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

  async getTag(id: string): Promise<Tag> {
    const tag = await this.tagsRepository.findById(id);
    if (!tag) {
      throw new NotFoundException(`Tag with ID "${id}" not found`);
    }
    return tag;
  }

  async updateTag(id: string, updateTagDto: UpdateTagDto): Promise<Tag> {
    const tag = await this.getTag(id);
    return this.tagsRepository.updateTag(id, {
      ...tag,
      ...updateTagDto,
    });
  }

  async deleteTag(id: string): Promise<void> {
    await this.getTag(id);
    await this.tagsRepository.deleteTag(id);
  }
}
