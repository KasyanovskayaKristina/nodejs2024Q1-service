import { User } from 'src/user/entity/user.entity';
import { Artist } from 'src/artist/entity/artist.entity';
import { Track } from 'src/tracks/entity/track.entity';
import { Album } from 'src/albums/entity/album.entity';

export const mockUsers: User[] = [
  new User({ password: 'example', login: 'example_logIn' }),
  new User({ password: 'example', login: 'example_logIn2' }),
];

export const mockArtists: Artist[] = [
  new Artist({ name: 'Imagine Dragons', grammy: false }),
  new Artist({ name: 'Frank Sinatra', grammy: true }),
];

export const mockAlbums: Album[] = [
  new Album({ name: 'Album', year: 2024, artistId: '1' }),
  new Album({ name: 'Memory', year: 2024, artistId: '2' }),
];

export const mockTracks: Track[] = [
  new Track({
    name: 'Example',
    duration: 120,
    artistId: '1',
    albumId: '1',
  }),
  new Track({
    name: 'Example',
    duration: 130,
    artistId: '2',
    albumId: '2',
  }),
];
