import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SocialApp } from 'src/social-apps/social-app.entity';
import { User } from 'src/users/user.entity';
import { In, Repository } from 'typeorm';
import { Collection } from '../collections/collection.entity';
import { Tag } from '../tags/tag.entity'; // Make sure to import the Tag entity
import { Bookmark } from './bookmark.entity';
import { BookmarksRepository } from './bookmarks.repository';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';

@Injectable()
export class BookmarksService {
  constructor(
    private readonly bookmarksRepository: BookmarksRepository,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    @InjectRepository(SocialApp)
    private readonly appRepository: Repository<SocialApp>,
    @InjectRepository(Collection)
    private readonly collectionRepository: Repository<Collection>,
  ) {}

  async createBookmark(
    createBookmarkDto: CreateBookmarkDto,
    userId: string,
  ): Promise<Bookmark> {
    const { collectionId, tagIds, appId, ...bookmarkData } = createBookmarkDto;

    // Check if the collection exists
    const collection = await this.collectionRepository.findOne({
      where: { id: collectionId },
      relations: ['user'],
    });
    if (!collection || collection.user.id !== userId) {
      throw new NotFoundException(
        `Collection with ID "${collectionId}" not found`,
      );
    }

    // Check and get tags if provided
    let tags: Tag[] | undefined;
    if (tagIds) {
      tags = await this.tagRepository.find({
        where: { id: In(tagIds), userId },
      });
      if (tags.length !== tagIds.length) {
        throw new NotFoundException(
          `One or more tag IDs were not found: ${tagIds.filter(
            (id) => !tags?.some((tag) => tag.id === id),
          )}`,
        );
      }
    }

    // Check and get app if provided
    let app: SocialApp | undefined;
    if (appId) {
      app =
        (await this.appRepository.findOne({ where: { id: appId } })) ??
        undefined;
      if (!app) {
        throw new BadRequestException('Invalid app ID');
      }
    }

    return this.bookmarksRepository.createBookmark({
      ...bookmarkData,
      collection,
      tags,
      app,
      userId,
    });
  }

  async getBookmark(id: string, userId: string | undefined): Promise<Bookmark> {
    const bookmark = await this.bookmarksRepository.findById(id);
    if (!bookmark) {
      throw new NotFoundException(`Bookmark with ID "${id}" not found`);
    }

    const collection = await this.collectionRepository.findOne({
      where: { id: bookmark.collectionId },
      relations: ['user'],
    });
    if (collection && collection.private && collection.user.id !== userId) {
      throw new NotFoundException(`Bookmark with ID "${id}" not found`);
    }
    return bookmark;
  }

  async updateBookmark(
    id: string,
    updateBookmarkDto: UpdateBookmarkDto,
    userId: string,
  ): Promise<Bookmark> {
    const bookmark = await this.getBookmark(id, userId);

    // Check if the bookmark belongs to the user
    if (!bookmark || bookmark.userId !== userId) {
      throw new NotFoundException(
        `Bookmark with ID "${id}" not found or does not belong to you`,
      );
    }

    const updateData: Partial<Bookmark> = { ...updateBookmarkDto };

    // Handle tags update
    if (updateBookmarkDto.tagIds !== undefined) {
      if (updateBookmarkDto.tagIds.length === 0) {
        // If tagIds is an empty array, remove all tags
        updateData.tags = [];
      } else {
        // Fetch tags based on provided tagIds
        const tags = await this.tagRepository.find({
          where: { id: In(updateBookmarkDto.tagIds), userId },
        });

        // Check if all provided tagIds were found
        if (tags.length !== updateBookmarkDto.tagIds.length) {
          const missingTagIds = updateBookmarkDto.tagIds.filter(
            (id) => !tags.some((tag) => tag.id === id),
          );
          throw new NotFoundException(
            `One or more tag IDs were not found: ${missingTagIds.join(', ')}`,
          );
        }

        // Update tags
        updateData.tags = tags;
      }
    }

    if (updateBookmarkDto.appId !== undefined) {
      if (updateBookmarkDto.appId === null) {
        updateData.app = undefined;
      } else {
        const app = await this.appRepository.findOne({
          where: { id: updateBookmarkDto.appId },
        });
        if (!app) {
          throw new NotFoundException(
            `App with ID "${updateBookmarkDto.appId}" not found`,
          );
        }
        updateData.app = app;
      }
    }

    if (updateBookmarkDto.collectionId) {
      const collection = await this.collectionRepository.findOne({
        where: { id: updateBookmarkDto.collectionId, userId },
      });
      if (!collection) {
        throw new NotFoundException(
          `Collection with ID "${updateBookmarkDto.collectionId}" not found`,
        );
      }
      updateData.collection = collection;
    }

    return this.bookmarksRepository.updateBookmark(id, updateData);
  }

  async deleteBookmark(id: string, userId: string): Promise<void> {
    const bookmark = await this.getBookmark(id, userId);
    if (!bookmark || bookmark.userId !== userId) {
      throw new NotFoundException(
        'You do not have permission to delete this bookmark',
      );
    }
    await this.bookmarksRepository.deleteBookmark(id);
  }

  async searchBookmarks(query: string, userId: string): Promise<Bookmark[]> {
    return this.bookmarksRepository.searchBookmarks(query, userId);
  }

  async getBookmarksByCollectionId(
    collectionId: string,
    user: User | null,
  ): Promise<Bookmark[]> {
    const collection = await this.collectionRepository.findOne({
      where: { id: collectionId },
      relations: ['user'],
    });

    if (!collection) {
      throw new NotFoundException(
        `Collection with ID "${collectionId}" not found`,
      );
    }

    if (collection.private && (!user || user.id !== collection.user.id)) {
      throw new ForbiddenException(
        'You do not have permission to view this collection',
      );
    }

    return this.bookmarksRepository.findByCollectionId(collectionId);
  }

  async getBookmarksBySocialApp(
    socialAppId: string,
    userId: string,
  ): Promise<Bookmark[]> {
    return this.bookmarksRepository.findBySocialApp(socialAppId, userId);
  }
}
