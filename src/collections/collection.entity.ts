import { ApiProperty } from '@nestjs/swagger';
import { Bookmark } from 'src/bookmarks/bookmark.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VirtualColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('collections')
export class Collection {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  title: string;

  @Column({ default: false })
  @ApiProperty({ required: false })
  private: boolean;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.collections)
  user: User;

  @Column()
  @ApiProperty()
  userId: string;

  @OneToMany(() => Bookmark, (bookmark) => bookmark.collection, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  bookmarks: Bookmark[];

  @VirtualColumn({
    query: (alias) =>
      `SELECT COUNT(*) FROM bookmarks WHERE "collectionId" = ${alias}.id`,
  })
  @ApiProperty()
  bookmarkCount: number;

  @VirtualColumn({
    query: (alias) =>
      `SELECT COALESCE(ARRAY_AGG(image_url) FILTER (WHERE image_url IS NOT NULL), ARRAY[]::text[])
       FROM (
         SELECT image_url 
         FROM bookmarks 
         WHERE "collectionId" = ${alias}.id 
         AND image_url IS NOT NULL 
         ORDER BY "createdAt" DESC 
         LIMIT 4
       ) sub`,
  })
  @ApiProperty({ type: [String] })
  images: string[];
}
