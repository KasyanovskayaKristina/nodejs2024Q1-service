import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Track } from 'src/tracks/entity/track.entity';
import { Album } from 'src/albums/entity/album.entity';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: false })
  grammy: boolean;

  @OneToMany(() => Track, (track) => track.artist)
  tracks: Track[];

  @OneToMany(() => Album, (album) => album.artist)
  albums: Album[];

  constructor(dto?: Partial<Artist>) {
    if (dto) {
      Object.assign(this, dto);
    }
  }
}
