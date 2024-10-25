import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialApp } from 'src/social-apps/social-app.entity';
import { Collection } from '../collections/collection.entity';
import { Tag } from '../tags/tag.entity';
import { Bookmark } from './bookmark.entity';
import { BookmarksController } from './bookmarks.controller';
import { BookmarksRepository } from './bookmarks.repository';
import { BookmarksService } from './bookmarks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Bookmark, Tag, SocialApp, Collection])],
  controllers: [BookmarksController],
  providers: [BookmarksService, BookmarksRepository],
  exports: [BookmarksService],
})
export class BookmarksModule {}
