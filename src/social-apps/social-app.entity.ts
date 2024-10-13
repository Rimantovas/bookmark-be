import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('social_apps')
export class SocialApp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  image: string;

  @Column()
  website: string;

  @Column()
  deeplink: string;
}
