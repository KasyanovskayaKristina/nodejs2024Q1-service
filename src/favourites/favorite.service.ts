import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from 'src/artist/entity/artist.entity';
import { Album } from 'src/albums/entity/album.entity';
import { Track } from 'src/tracks/entity/track.entity';
import { Fav } from './entity/fav.entity';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Fav)
    private favRepository: Repository<Fav>,
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAllFavs(userId: string) {
    const favs = await this.favRepository.findOne({
      where: { user: { id: userId } },
      relations: ['artists', 'albums', 'tracks'],
    });

    if (!favs) {
      throw new HttpException('Favorites not found', HttpStatus.NOT_FOUND);
    }

    return favs;
  }

  async addArtistToFavs(userId: string, artistId: string) {
    const artist = await this.artistRepository.findOneBy({ id: artistId });
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    let favs = await this.favRepository.findOne({
      where: { user: { id: userId } },
      relations: ['artists', 'albums', 'tracks'],
    });

    if (!favs) {
      favs = this.favRepository.create({
        user,
        artists: [artist],
        albums: [],
        tracks: [],
      });
    } else {
      const isArtistAlreadyAdded = favs.artists.some((a) => a.id === artistId);
      if (!isArtistAlreadyAdded) {
        favs.artists.push(artist);
      } else {
        throw new HttpException(
          'Artist is already in favorites',
          HttpStatus.CONFLICT,
        );
      }
    }

    await this.favRepository.save(favs);
    return favs;
  }

  async addAlbumToFavs(userId: string, albumId: string) {
    const album = await this.albumRepository.findOneBy({ id: albumId });
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    let favs = await this.favRepository.findOne({
      where: { user: { id: userId } },
      relations: ['artists', 'albums', 'tracks'],
    });

    if (!favs) {
      favs = this.favRepository.create({
        user,
        albums: [album],
        artists: [],
        tracks: [],
      });
    } else {
      const isAlbumAlreadyAdded = favs.albums.some((a) => a.id === albumId);
      if (!isAlbumAlreadyAdded) {
        favs.albums.push(album);
      } else {
        throw new HttpException(
          'Album already in favorites',
          HttpStatus.CONFLICT,
        );
      }
    }

    await this.favRepository.save(favs);
    return favs;
  }

  async removeAlbumFromFavs(userId: string, albumId: string) {
    const favs = await this.favRepository.findOne({
      where: { user: { id: userId } },
      relations: ['albums', 'tracks', 'artists'],
    });
    if (!favs) {
      throw new HttpException('Favorites not found', HttpStatus.NOT_FOUND);
    }

    const index = favs.albums.findIndex((a) => a.id === albumId);
    if (index > -1) {
      favs.albums.splice(index, 1);
      await this.favRepository.save(favs);
    } else {
      throw new HttpException(
        'Album not found in favorites',
        HttpStatus.NOT_FOUND,
      );
    }

    return favs;
  }

  async addTrackToFavs(userId: string, trackId: string) {
    const track = await this.trackRepository.findOneBy({ id: trackId });
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    let favs = await this.favRepository.findOne({
      where: { user: { id: user.id } },
      relations: ['tracks'],
    });

    if (!favs) {
      favs = this.favRepository.create({
        user,
        tracks: [track],
        albums: [],
        artists: [],
      });
    } else {
      const alreadyAdded = favs.tracks.find((t) => t.id === trackId);
      if (!alreadyAdded) {
        favs.tracks.push(track);
      } else {
        throw new HttpException(
          'Track already in favorites',
          HttpStatus.CONFLICT,
        );
      }
    }

    await this.favRepository.save(favs);
    return favs;
  }

  async removeTrackFromFavs(userId: string, trackId: string) {
    const favs = await this.favRepository.findOne({
      where: { user: { id: userId } },
      relations: ['albums', 'tracks', 'artists'],
    });
    if (!favs) {
      throw new HttpException('Favorites not found', HttpStatus.NOT_FOUND);
    }

    const index = favs.tracks.findIndex((t) => t.id === trackId);
    if (index > -1) {
      favs.tracks.splice(index, 1);
      await this.favRepository.save(favs);
    } else {
      throw new HttpException(
        'Track not found in favorites',
        HttpStatus.NOT_FOUND,
      );
    }

    return favs;
  }
  async removeArtistFromFavs(userId: string, artistId: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const favs = await this.favRepository.findOne({
      where: { user: { id: userId } },
      relations: ['artists', 'albums', 'tracks'],
    });

    if (!favs) {
      throw new HttpException(
        'Favorites not found for the user',
        HttpStatus.NOT_FOUND,
      );
    }

    const artistIndex = favs.artists.findIndex((a) => a.id === artistId);
    if (artistIndex === -1) {
      throw new HttpException(
        'Artist not found in favorites',
        HttpStatus.NOT_FOUND,
      );
    }

    favs.artists.splice(artistIndex, 1);

    await this.favRepository.save(favs);
    return { message: 'Artist removed from favorites successfully' };
  }
}
