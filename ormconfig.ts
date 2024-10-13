import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

export const config = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false,
  // logging: process.env.STAGE === 'localhost' ? true : false,
  dropSchema: false,
  synchronize: true,
  migrationsRun: false,
  migrations: ['dist/src/migrations/*.js'],
  entities: ['dist/src/**/*.entity.js'],
  migrationsTableName: 'typeorm_migrations',
  cli: {
    migrationsDir: 'src/migrations',
  },
  // Nestjs specific options:
  autoLoadEntities: true,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
