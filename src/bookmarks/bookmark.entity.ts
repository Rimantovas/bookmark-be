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
  id: string;

  @Column()
  link: string;

  @Column({ nullable: true })
  title?: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
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
  tags: Tag[];

  @ManyToOne(() => SocialApp, { nullable: true })
  app: SocialApp;

  @ManyToOne(() => Collection, (collection) => collection.bookmarks)
  collection: Collection;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
