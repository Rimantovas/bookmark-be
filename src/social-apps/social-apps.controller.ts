import { Controller, Get, Param } from '@nestjs/common';
import { SocialApp } from './social-app.entity';
import { SocialAppsService } from './social-apps.service';

@Controller('social-apps')
export class SocialAppsController {
  constructor(private readonly socialAppsService: SocialAppsService) {}

  @Get()
  async getSocialApps(): Promise<SocialApp[]> {
    return this.socialAppsService.getSocialApps();
  }

  @Get(':id')
  async getSocialApp(@Param('id') id: string): Promise<SocialApp> {
    return this.socialAppsService.getSocialApp(id);
  }
}
