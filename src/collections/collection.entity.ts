import { Bookmark } from 'src/bookmarks/bookmark.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('collections')
export class Collection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ default: false })
  private: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.collections)
  user: User;

  @Column()
  userId: string;

  @OneToMany(() => Bookmark, (bookmark) => bookmark.collection)
  bookmarks: Bookmark[];
}
