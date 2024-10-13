import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
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
  async getSocialApps(): Promise<SocialApp[]> {
    return this.socialAppsService.getSocialApps();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a specific social app',
    operationId: 'getSocialApp',
  })
  async getSocialApp(@Param('id') id: string): Promise<SocialApp> {
    return this.socialAppsService.getSocialApp(id);
  }
}
