import { v4 as uuid } from 'uuid';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';

export class Artist {
  readonly id: string;
  name: string;
  grammy: boolean;
  constructor({ name, grammy }: CreateArtistDto) {
    this.id = uuid();
    this.name = name;
    this.grammy = grammy;
  }
  updateArtist(updateArtistDto: UpdateArtistDto) {
    for (const prop in updateArtistDto) {
      if (updateArtistDto[prop] || updateArtistDto[prop] === false) {
        this[prop] = updateArtistDto[prop];
      }
    }
    return this;
  }
}
