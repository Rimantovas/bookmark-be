import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth0JwtGuard } from 'src/auth/auth0-jwt.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { Bookmark } from 'src/bookmarks/bookmark.entity';
import { BookmarksService } from 'src/bookmarks/bookmarks.service';
import { User } from 'src/users/user.entity';
import { SocialApp } from './social-app.entity';
import { SocialAppsService } from './social-apps.service';

@ApiTags('social-apps')
@Controller('social-apps')
export class SocialAppsController {
  constructor(
    private readonly socialAppsService: SocialAppsService,
    private readonly bookmarksService: BookmarksService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Get all social apps',
    operationId: 'getSocialApps',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SocialApp,
    isArray: true,
  })
  async getSocialApps(): Promise<SocialApp[]> {
    return this.socialAppsService.getSocialApps();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a specific social app',
    operationId: 'getSocialApp',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SocialApp,
  })
  async getSocialApp(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<SocialApp> {
    return this.socialAppsService.getSocialApp(id);
  }

  @Get(':id/bookmarks')
  @ApiOperation({
    summary: 'Get bookmarks for a specific social app',
    operationId: 'getSocialAppBookmarks',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Bookmark,
    isArray: true,
  })
  @UseGuards(Auth0JwtGuard)
  async getSocialAppBookmarks(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: Promise<User>,
  ): Promise<Bookmark[]> {
    const resolvedUser = await user;
    return this.bookmarksService.getBookmarksBySocialApp(id, resolvedUser.id);
  }
}
