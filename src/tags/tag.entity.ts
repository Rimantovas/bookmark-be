import { ApiProperty } from '@nestjs/swagger';
import { Exclude, instanceToPlain } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ type: String })
  id: string;

  @Column()
  @ApiProperty({ type: String })
  name: string;

  @Column()
  @ApiProperty({ type: String })
  color: string;

  @Column({ nullable: true })
  @ApiProperty({ type: String, required: false })
  icon?: string;

  @CreateDateColumn()
  @ApiProperty({ type: Date })
  @Exclude({ toPlainOnly: true })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ type: Date })
  @Exclude({ toPlainOnly: true })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.tags)
  user: User;

  @Column()
  @ApiProperty({ type: String })
  @Exclude({ toPlainOnly: true })
  userId: string;

  toJSON() {
    return instanceToPlain(this);
  }
}
