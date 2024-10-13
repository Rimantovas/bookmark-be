import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Collection } from '../collections/collection.entity';
import { SocialApp } from '../social-apps/social-app.entity';
import { Tag } from '../tags/tag.entity';

@Entity('bookmarks')
export class Bookmark {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  link: string;

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  title?: string;

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  description?: string;

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  image_url?: string;

  @ManyToMany(() => Tag)
  @JoinTable({
    name: 'bookmark_tags',
    joinColumn: {
      name: 'bookmark_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id',
    },
  })
  @ApiProperty({ type: [String], description: 'Array of tag IDs' })
  tags: Tag[];

  @ManyToOne(() => SocialApp, { nullable: true })
  @ApiProperty({ type: String, required: false, description: 'Social app ID' })
  app: SocialApp;

  @ManyToOne(() => Collection, (collection) => collection.bookmarks)
  @ApiProperty({ type: String, required: false, description: 'Collection ID' })
  collection: Collection;

  @Column({ type: 'jsonb', nullable: true })
  @ApiProperty({ type: Object, required: false })
  metadata: Record<string, any>;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;
}
