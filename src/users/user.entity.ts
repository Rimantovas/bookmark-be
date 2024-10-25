import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Bookmark } from '../bookmarks/bookmark.entity';
import { Collection } from '../collections/collection.entity';
import { UserRole } from '../shared/enums/user-role.enum';
import { Tag } from '../tags/tag.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: false })
  @ApiProperty({ type: String, required: true })
  name: string;

  @Column({ nullable: false, unique: true })
  @ApiProperty({ type: String, required: true })
  username: string;

  @Column({ nullable: false, unique: true })
  @ApiProperty({ type: String, required: true })
  email: string;

  @Column({ nullable: true })
  @ApiProperty({ type: String, required: false })
  image_url: string;

  @Column({ nullable: true, type: 'enum', enum: UserRole })
  @ApiProperty({ type: String, required: false })
  role: UserRole;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;

  @OneToMany(() => Collection, (collection) => collection.user)
  collections: Collection[];

  @OneToMany(() => Tag, (tag) => tag.user)
  tags: Tag[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.user)
  bookmarks: Bookmark[];
}
