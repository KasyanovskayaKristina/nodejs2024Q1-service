import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Artist } from 'src/interface/interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArtistService {
  private readonly artists: Artist[] = [
    { id: '1', name: 'Artist 1', grammy: false },
    { id: '2', name: 'Artist 2', grammy: true },
    { id: '3', name: 'Artist 3', grammy: false },
  ];

  async getAllArtists(): Promise<{ artists: Artist[]; statusCode: number }> {
    return { artists: this.artists, statusCode: HttpStatus.OK };
  }

  async getArtistById(
    artistId: string,
  ): Promise<{ artist: Artist; statusCode: number }> {
    if (!this.isUuid(artistId)) {
      throw new BadRequestException('Invalid artist ID');
    }

    const artist = this.artists.find((a) => a.id === artistId);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return { artist, statusCode: HttpStatus.OK };
  }

  async createArtist(
    artist: Artist,
  ): Promise<{ artist: Artist; statusCode: number }> {
    if (!artist.name) {
      throw new BadRequestException('Name is required');
    }

    const newArtist: Artist = {
      id: uuidv4(),
      ...artist,
    };
    this.artists.push(newArtist);
    return { artist: newArtist, statusCode: HttpStatus.CREATED };
  }

  private isUuid(id: string): boolean {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(id);
  }
  async updateArtist(
    artistId: string,
    updatedArtist: Artist,
  ): Promise<{ artist: Artist; statusCode: number }> {
    if (!this.isUuid(artistId)) {
      throw new BadRequestException('Invalid artist ID');
    }

    const index = this.artists.findIndex((artist) => artist.id === artistId);
    if (index === -1) {
      throw new NotFoundException('Artist not found');
    }

    const updated = { ...this.artists[index], ...updatedArtist };
    this.artists[index] = updated;
    return { artist: updated, statusCode: 200 };
  }
  async deleteArtist(artistId: string): Promise<number> {
    if (!this.isUuid(artistId)) {
      throw new BadRequestException('Invalid artist ID');
    }

    const index = this.artists.findIndex((artist) => artist.id === artistId);
    if (index === -1) {
      throw new NotFoundException('Artist not found');
    }

    this.artists.splice(index, 1);
    return 204;
  }
}
