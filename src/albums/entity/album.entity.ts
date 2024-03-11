import { v4 as uuid } from 'uuid';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';

export class Album {
  readonly id: string;
  name: string;
  year: number;
  artistId: string | null;
  constructor(dto: CreateAlbumDto) {
    this.id = uuid();
    this.name = dto.name;
    this.year = dto.year;
    this.artistId = dto.artistId;
  }
  updateAlbum(updateAlbumDto: UpdateAlbumDto) {
    for (const prop in updateAlbumDto) {
      if (updateAlbumDto[prop]) {
        this[prop] = updateAlbumDto[prop];
      }
    }
    return this;
  }
}
