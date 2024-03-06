import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { Artist } from 'src/interface/interface';
import { ArtistService } from 'src/services/artist.service';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  async getAllArtists(): Promise<{ artists: Artist[]; statusCode: number }> {
    return await this.artistService.getAllArtists();
  }

  @Get(':id')
  async getArtistById(
    @Param('id') artistId: string,
  ): Promise<{ artist: Artist; statusCode: number }> {
    try {
      return await this.artistService.getArtistById(artistId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      } else {
        throw error;
      }
    }
  }

  @Post()
  async createArtist(
    @Body() artist: Artist,
  ): Promise<{ artist: Artist; statusCode: number }> {
    try {
      return await this.artistService.createArtist(artist);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      } else if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      } else {
        throw error;
      }
    }
  }
  @Put(':id')
  async updateArtist(
    @Param('id') artistId: string,
    @Body() updatedArtist: Artist,
  ): Promise<{ artist: Artist; statusCode: number }> {
    try {
      return await this.artistService.updateArtist(artistId, updatedArtist);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      } else if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw error;
      }
    }
  }
  @Delete(':id')
  async deleteArtist(@Param('id') artistId: string): Promise<number> {
    try {
      return await this.artistService.deleteArtist(artistId);
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      } else {
        throw new Error('Internal server error');
      }
    }
  }
}
