import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { validate } from 'class-validator';
import { formatValidationErrors } from 'src/errors/error';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { validate as uuidValidate } from 'uuid';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DbService } from 'src/db/db.service';

@Injectable()
export class AlbumService {
  constructor(private readonly dbService: DbService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    await this.validateDto(new CreateAlbumDto(createAlbumDto));

    await this.verifyArtistExistence(createAlbumDto.artistId);

    const album = await this.dbService.addNewAlbum(createAlbumDto);
    return album;
  }

  findAll() {
    return this.dbService.listAlbums();
  }

  async findOne(id: string) {
    this.validateUuid(id);
    const album = await this.dbService.findAlbumById(id);
    if (!album)
      throw new HttpException('Album not found.', HttpStatus.NOT_FOUND);
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    this.validateUuid(id);
    await this.validateDto(new UpdateAlbumDto(updateAlbumDto));

    const album = await this.dbService.findAlbumById(id);
    if (!album)
      throw new HttpException(
        'Album to update not found.',
        HttpStatus.NOT_FOUND,
      );

    await this.verifyArtistExistence(updateAlbumDto.artistId);

    await album.updateAlbum(updateAlbumDto);
    return album;
  }

  async remove(id: string) {
    this.validateUuid(id);
    const album = await this.dbService.findAlbumById(id);
    if (!album)
      throw new HttpException(
        'Album to remove not found.',
        HttpStatus.NOT_FOUND,
      );

    await this.dbService.removeAlbumById(id);
    return `Album with ID: ${id} has been removed.`;
  }

  private async validateDto(dto: any) {
    const validationErrors = await validate(dto);
    if (validationErrors.length > 0) {
      const msg = formatValidationErrors(validationErrors);
      throw new HttpException(msg, HttpStatus.BAD_REQUEST);
    }
  }

  private async verifyArtistExistence(artistId?: string) {
    if (artistId && !(await this.dbService.findArtistById(artistId))) {
      throw new HttpException(
        'Associated artist does not exist.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private validateUuid(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('Invalid ID format.', HttpStatus.BAD_REQUEST);
    }
  }
}
