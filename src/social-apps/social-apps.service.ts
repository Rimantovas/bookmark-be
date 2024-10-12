import { Injectable, NotFoundException } from '@nestjs/common';
import { SocialApp } from './social-app.entity';
import { SocialAppsRepository } from './social-apps.repository';

@Injectable()
export class SocialAppsService {
  constructor(private readonly socialAppsRepository: SocialAppsRepository) {}

  async getSocialApps(): Promise<SocialApp[]> {
    return this.socialAppsRepository.findAll();
  }

  async getSocialApp(id: string): Promise<SocialApp> {
    const app = await this.socialAppsRepository.findById(id);
    if (!app) {
      throw new NotFoundException(`Social App with ID "${id}" not found`);
    }
    return app;
  }
}
