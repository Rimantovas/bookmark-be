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

  @OneToMany(() => Bookmark, (bookmark) => bookmark.collection)
  bookmarks: Bookmark[];
}
