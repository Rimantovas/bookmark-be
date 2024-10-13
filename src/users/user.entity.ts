import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Collection } from '../collections/collection.entity';
import { UserRole } from '../shared/enums/user-role.enum';
import { Tag } from '../tags/tag.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  image_url: string;

  @Column({ nullable: true, type: 'enum', enum: UserRole })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Collection, (collection) => collection.user)
  collections: Collection[];

  @OneToMany(() => Tag, (tag) => tag.user)
  tags: Tag[];
}
