import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { validate as uuidValidate } from 'uuid';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DbService } from 'src/db/db.service';
import { validate } from 'class-validator';
import { formatValidationErrors } from 'src/errors/error';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(private readonly dbService: DbService) {}

  async create(createArtistDto: CreateArtistDto) {
    await this.validateDto(new CreateArtistDto(createArtistDto));
    const artist = await this.dbService.addNewArtist(createArtistDto);
    return artist;
  }

  findAll() {
    return this.dbService.listArtists();
  }

  async findOne(id: string) {
    this.validateUuid(id);
    const artist = await this.dbService.findArtistById(id);
    if (!artist)
      throw new HttpException('Artist not found.', HttpStatus.NOT_FOUND);
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    this.validateUuid(id);
    await this.validateDto(new UpdateArtistDto(updateArtistDto));

    const artist = await this.dbService.findArtistById(id);
    if (!artist)
      throw new HttpException(
        'Artist to update not found.',
        HttpStatus.NOT_FOUND,
      );

    await artist.updateArtist(updateArtistDto); // Assuming updateArtist method is properly implemented
    return artist;
  }

  async remove(id: string) {
    this.validateUuid(id);
    const artist = await this.dbService.findArtistById(id);
    if (!artist)
      throw new HttpException(
        'Artist to remove not found.',
        HttpStatus.NOT_FOUND,
      );

    await this.dbService.removeArtistById(id);
  }

  private async validateDto(dto: any) {
    const validationErrors = await validate(dto);
    if (validationErrors.length > 0) {
      const msg = formatValidationErrors(validationErrors);
      throw new HttpException(msg, HttpStatus.BAD_REQUEST);
    }
  }

  private validateUuid(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Invalid ID format. Please provide a valid UUID.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
