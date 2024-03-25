import { Album } from 'src/albums/entity/album.entity';
import { Artist } from 'src/artist/entity/artist.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  duration: number;

  @ManyToOne(() => Artist, (artist) => artist.tracks, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  artist: Artist;

  @ManyToOne(() => Album, (album) => album.tracks, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  album: Album;

  constructor(dto?: Partial<Track>) {
    if (dto) {
      Object.assign(this, dto);
    }
  }
}
