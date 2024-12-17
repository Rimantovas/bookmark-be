import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookmarksModule } from 'src/bookmarks/bookmarks.module';
import { SocialApp } from './social-app.entity';
import { SocialAppsController } from './social-apps.controller';
import { SocialAppsRepository } from './social-apps.repository';
import { SocialAppsService } from './social-apps.service';

@Module({
  imports: [TypeOrmModule.forFeature([SocialApp]), BookmarksModule],
  controllers: [SocialAppsController],
  providers: [SocialAppsService, SocialAppsRepository],
  exports: [SocialAppsService],
})
export class SocialAppsModule {}
