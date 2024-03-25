import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from 'src/albums/entity/album.entity';
import { Artist } from 'src/artist/entity/artist.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  /*async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const validationErrors = await validate(createAlbumDto);
    if (validationErrors.length > 0) {
      throw new HttpException(
        formatValidationErrors(validationErrors),
        HttpStatus.BAD_REQUEST,
      );
    }

    if (createAlbumDto.artistId) {
      const artist = await this.artistRepository.findOne({
        where: { id: createAlbumDto.artistId },
      });
      if (!artist) {
        throw new HttpException(
          'Associated artist does not exist.',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const album = this.albumRepository.create(createAlbumDto);
    return this.albumRepository.save(album);
  }*/
  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    if (createAlbumDto.artistId) {
      const artistExists = await this.artistRepository.findOneBy({
        id: createAlbumDto.artistId,
      });
      if (!artistExists) {
        throw new HttpException(
          'Associated artist does not exist.',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const album = this.albumRepository.create(createAlbumDto);
    return this.albumRepository.save(album);
  }

  findAll(): Promise<Album[]> {
    return this.albumRepository.find({ relations: ['artist'] });
  }

  async findOne(id: string): Promise<Album> {
    const album = await this.albumRepository.findOne({
      where: { id },
      relations: ['artist'],
    });
    if (!album) {
      throw new HttpException('Album not found.', HttpStatus.NOT_FOUND);
    }
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) {
      throw new HttpException('Album not found.', HttpStatus.NOT_FOUND);
    }

    if (updateAlbumDto.artistId) {
      const artist = await this.artistRepository.findOne({
        where: { id: updateAlbumDto.artistId },
      });
      if (!artist) {
        throw new HttpException(
          'Associated artist does not exist.',
          HttpStatus.BAD_REQUEST,
        );
      }
      album.artist = artist;
    }

    this.albumRepository.merge(album, updateAlbumDto);
    return this.albumRepository.save(album);
  }

  async remove(id: string): Promise<void> {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) {
      throw new HttpException('Album not found.', HttpStatus.NOT_FOUND);
    }
    await this.albumRepository.remove(album);
  }
}
