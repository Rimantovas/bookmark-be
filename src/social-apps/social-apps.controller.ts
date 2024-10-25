import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SocialApp } from './social-app.entity';
import { SocialAppsService } from './social-apps.service';

@ApiTags('social-apps')
@Controller('social-apps')
export class SocialAppsController {
  constructor(private readonly socialAppsService: SocialAppsService) {}

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
}
