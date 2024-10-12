import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
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
