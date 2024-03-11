import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { formatValidationErrors } from 'src/errors/error';
import { UpdateTrackDto } from './dto/update-track.dto';
import { validate } from 'class-validator';
import { validate as uuidValidate } from 'uuid';

@Injectable()
export class TrackService {
  constructor(private readonly databaseService: DbService) {}

  async create(createTrackDto: CreateTrackDto) {
    const dto = new CreateTrackDto(createTrackDto);
    await this.validateDto(dto);

    await this.verifyDependencies(dto.artistId, dto.albumId);
    const track = await this.databaseService.addNewTrack(dto);
    return track;
  }

  findAll() {
    return this.databaseService.listTracks();
  }

  async findOne(id: string) {
    this.validateUuid(id);
    const track = await this.databaseService.findTrackById(id);
    if (!track)
      throw new HttpException('Track not found.', HttpStatus.NOT_FOUND);
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    this.validateUuid(id);
    const dto = new UpdateTrackDto(updateTrackDto);
    await this.validateDto(dto);

    const track = await this.databaseService.findTrackById(id);
    if (!track)
      throw new HttpException(
        'Track to update not found.',
        HttpStatus.NOT_FOUND,
      );

    await this.verifyDependencies(dto.artistId, dto.albumId);
    await track.updateTrack(dto);
    return track;
  }

  async remove(id: string) {
    this.validateUuid(id);
    const track = await this.databaseService.findTrackById(id);
    if (!track)
      throw new HttpException(
        'Track to remove not found.',
        HttpStatus.NOT_FOUND,
      );

    await this.databaseService.removeTrackById(id);
  }

  private async validateDto(dto: any) {
    const validationErrors = await validate(dto);
    if (validationErrors.length > 0) {
      const msg = formatValidationErrors(validationErrors);
      throw new HttpException(msg, HttpStatus.BAD_REQUEST);
    }
  }

  private async verifyDependencies(artistId?: string, albumId?: string) {
    if (artistId && !(await this.databaseService.findArtistById(artistId))) {
      throw new HttpException(
        'Associated artist not found.',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (albumId && !(await this.databaseService.findAlbumById(albumId))) {
      throw new HttpException(
        'Associated album not found.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private validateUuid(id: string) {
    if (!uuidValidate(id))
      throw new HttpException(
        'Invalid track ID format.',
        HttpStatus.BAD_REQUEST,
      );
  }
}
