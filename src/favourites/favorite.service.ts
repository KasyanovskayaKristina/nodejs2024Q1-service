import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DbService } from 'src/db/db.service';
import { validate as uuidValidate } from 'uuid';

@Injectable()
export class FavoriteService {
  constructor(private readonly dbService: DbService) {}

  findAll() {
    return this.dbService.listAllFavourites();
  }

  async addArtist(id: string) {
    await this.validateIdAndExistence(id, 'artist');
    const artistAlreadyInFavs = await this.dbService.favs.getArtistById(id);
    if (artistAlreadyInFavs) {
      throw new HttpException(
        'Artist already in favorites.',
        HttpStatus.CONFLICT,
      );
    }
    await this.dbService.favs.addArtist(id);
    return `Artist with ID: ${id} is added to favorites.`;
  }

  async removeArtist(id: string) {
    await this.validateIdAndExistence(id, 'artist', true);
    await this.dbService.favs.removeArtist(id);
    return `Artist with ID: ${id} is removed from favorites.`;
  }

  async addAlbum(id: string) {
    await this.validateIdAndExistence(id, 'album');
    const albumAlreadyInFavs = await this.dbService.favs.getAlbumById(id);
    if (albumAlreadyInFavs) {
      throw new HttpException(
        'Album already in favorites.',
        HttpStatus.CONFLICT,
      );
    }
    await this.dbService.favs.addAlbum(id);
    return `Album with ID: ${id} is added to favorites.`;
  }

  async removeAlbum(id: string) {
    await this.validateIdAndExistence(id, 'album', true);
    await this.dbService.favs.removeAlbum(id);
    return `Album with ID: ${id} is removed from favorites.`;
  }

  async addTrack(id: string) {
    await this.validateIdAndExistence(id, 'track');
    const trackAlreadyInFavs = await this.dbService.favs.getTrackById(id);
    if (trackAlreadyInFavs) {
      throw new HttpException(
        'Track already in favorites.',
        HttpStatus.CONFLICT,
      );
    }
    await this.dbService.favs.addTrack(id);
    return `Track with ID: ${id} is added to favorites.`;
  }

  async removeTrack(id: string) {
    await this.validateIdAndExistence(id, 'track', true);
    await this.dbService.favs.removeTrack(id);
    return `Track with ID: ${id} is removed from favorites.`;
  }

  private async validateIdAndExistence(
    id: string,
    type: 'artist' | 'album' | 'track',
    removal = false,
  ) {
    this.validateUuid(id);
    const entityExists = await this.dbService[
      `find${this.capitalizeFirstLetter(type)}ById`
    ](id);
    if (!entityExists) {
      throw new HttpException(
        `${this.capitalizeFirstLetter(type)} does not exist.`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    if (
      removal &&
      !(await this.dbService.favs[`get${this.capitalizeFirstLetter(type)}ById`](
        id,
      ))
    ) {
      throw new HttpException(
        `${this.capitalizeFirstLetter(type)} not found in favorites.`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  private validateUuid(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('Invalid ID format.', HttpStatus.BAD_REQUEST);
    }
  }

  private capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
