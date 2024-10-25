import { ApiProperty } from '@nestjs/swagger';
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
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.tags)
  user: User;

  @Column()
  @ApiProperty({ type: String })
  userId: string;
}
