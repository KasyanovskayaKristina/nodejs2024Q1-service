import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Album } from 'src/interface/interface';
import { AlbumService } from 'src/services/album.service';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async getAllAlbums(): Promise<Album[]> {
    return this.albumService.getAllAlbums();
  }

  @Get(':id')
  async getAlbumById(@Param('id') albumId: string): Promise<Album> {
    try {
      return await this.albumService.getAlbumById(albumId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw error;
      }
    }
  }

  @Post()
  async createAlbum(@Body() album: Album): Promise<Album> {
    try {
      return await this.albumService.createAlbum(album);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      } else {
        throw error;
      }
    }
  }

  @Put(':id')
  async updateAlbum(
    @Param('id') albumId: string,
    @Body() updatedAlbum: Album,
  ): Promise<Album> {
    try {
      return await this.albumService.updateAlbum(albumId, updatedAlbum);
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      } else {
        throw error;
      }
    }
  }

  @Delete(':id')
  async deleteAlbum(@Param('id') albumId: string): Promise<void> {
    try {
      await this.albumService.deleteAlbum(albumId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw error;
      }
    }
  }
}
