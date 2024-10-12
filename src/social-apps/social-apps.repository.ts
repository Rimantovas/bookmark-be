import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { SocialApp } from './social-app.entity';

@Injectable()
export class SocialAppsRepository extends Repository<SocialApp> {
  constructor(private dataSource: DataSource) {
    super(SocialApp, dataSource.createEntityManager());
  }

  async findAll(): Promise<SocialApp[]> {
    return this.find();
  }

  async findById(id: string): Promise<SocialApp | null> {
    return this.findOne({ where: { id } });
  }
}
