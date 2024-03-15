import { Album } from 'src/albums/entity/album.entity';
import { Artist } from 'src/artist/entity/artist.entity';
import { Track } from 'src/tracks/entity/track.entity';
import { User } from 'src/user/entity/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Fav {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.favs)
  user: User;

  @ManyToMany(() => Artist, { cascade: true })
  @JoinTable()
  artists: Artist[];

  @ManyToMany(() => Album, { cascade: true })
  @JoinTable()
  albums: Album[];

  @ManyToMany(() => Track, { cascade: true })
  @JoinTable()
  tracks: Track[];
}
