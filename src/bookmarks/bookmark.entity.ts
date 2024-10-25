import { ApiProperty } from '@nestjs/swagger';
import { Exclude, instanceToPlain } from 'class-transformer';
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
import { User } from '../users/user.entity';

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
  @Exclude({ toPlainOnly: true })
  app: SocialApp;

  @Column({ nullable: true })
  @ApiProperty({ type: String, required: false, description: 'Social app ID' })
  appId: string;

  @ManyToOne(() => Collection, (collection) => collection.bookmarks)
  @Exclude({ toPlainOnly: true })
  collection: Collection;

  @Column({ nullable: true })
  @ApiProperty({ type: String, required: true, description: 'Collection ID' })
  collectionId: string;

  @ManyToOne(() => User, (user) => user.bookmarks)
  user: User;

  @Column()
  @ApiProperty({ type: String, required: true, description: 'User ID' })
  userId: string;

  @Column({ type: 'jsonb', nullable: true })
  @ApiProperty({ type: Object, required: false })
  metadata: Record<string, any>;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;

  toJSON() {
    return instanceToPlain(this);
  }
}
