import { v4 as uuid } from 'uuid';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';

export class Track {
  readonly id: string;
  name: string;
  duration: number;
  artistId: string | null;
  albumId: string | null;

  constructor(dto: CreateTrackDto) {
    this.id = uuid();
    this.name = dto.name;
    this.duration = dto.duration;
    this.artistId = dto.artistId || null;
    this.albumId = dto.albumId || null;
  }

  updateTrack(updateTrackDto: UpdateTrackDto) {
    if (updateTrackDto.name !== undefined) {
      this.name = updateTrackDto.name;
    }
    if (updateTrackDto.duration !== undefined) {
      this.duration = updateTrackDto.duration;
    }
    if ('artistId' in updateTrackDto) {
      this.artistId = updateTrackDto.artistId;
    }
    if ('albumId' in updateTrackDto) {
      this.albumId = updateTrackDto.albumId;
    }
  }
}
