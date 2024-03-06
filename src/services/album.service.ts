import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Album } from 'src/interface/interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlbumService {
  private readonly albums: Album[] = [
    { id: '1', name: 'Album 1', year: 2020, artistId: null },
    { id: '2', name: 'Album 2', year: 2018, artistId: null },
    { id: '3', name: 'Album 3', year: 2015, artistId: null },
  ];

  async getAllAlbums(): Promise<Album[]> {
    return this.albums;
  }

  async getAlbumById(albumId: string): Promise<Album> {
    const album = this.albums.find((a) => a.id === albumId);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  async createAlbum(album: Album): Promise<Album> {
    if (!album.name || !album.year) {
      throw new BadRequestException('Name and year are required');
    }

    const newAlbum: Album = {
      id: uuidv4(),
      ...album,
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  async updateAlbum(albumId: string, updatedAlbum: Album): Promise<Album> {
    const index = this.albums.findIndex((a) => a.id === albumId);
    if (index === -1) {
      throw new NotFoundException('Album not found');
    }

    this.albums[index] = {
      ...this.albums[index],
      ...updatedAlbum,
    };
    return this.albums[index];
  }

  async deleteAlbum(albumId: string): Promise<void> {
    const index = this.albums.findIndex((a) => a.id === albumId);
    if (index === -1) {
      throw new NotFoundException('Album not found');
    }

    this.albums.splice(index, 1);
  }

  private isUuid(id: string): boolean {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(id);
  }
}
