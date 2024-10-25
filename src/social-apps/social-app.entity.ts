import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('social_apps')
export class SocialApp {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ type: String })
  id: string;

  @Column()
  @ApiProperty({ type: String })
  title: string;

  @Column()
  @ApiProperty({ type: String })
  image: string;

  @Column()
  @ApiProperty({ type: String })
  website: string;

  @Column()
  @ApiProperty({ type: String })
  deeplink: string;
}
