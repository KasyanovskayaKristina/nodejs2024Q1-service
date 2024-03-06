import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Track } from 'src/interface/interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TrackService {
  private readonly tracks: Track[] = [
    { id: '1', name: 'Track 1', artistId: null, albumId: null, duration: 180 },
    { id: '2', name: 'Track 2', artistId: null, albumId: null, duration: 240 },
    { id: '3', name: 'Track 3', artistId: null, albumId: null, duration: 200 },
  ];

  async getAllTracks(): Promise<Track[]> {
    return this.tracks;
  }

  async getTrackById(trackId: string): Promise<Track> {
    if (!this.isUuid(trackId)) {
      throw new BadRequestException('Invalid track ID');
    }

    const track = this.tracks.find((t) => t.id === trackId);
    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return track;
  }

  async addTrack(name: string, duration: number): Promise<Track> {
    const newTrack: Track = {
      id: uuidv4(),
      name,
      artistId: null,
      albumId: null,
      duration,
    };
    this.tracks.push(newTrack);
    return newTrack;
  }
  async updateTrack(
    trackId: string,
    updatedTrackData: Partial<Track>,
  ): Promise<Track> {
    if (!this.isUuid(trackId)) {
      throw new BadRequestException('Invalid track ID');
    }

    const trackIndex = this.tracks.findIndex((track) => track.id === trackId);
    if (trackIndex === -1) {
      throw new NotFoundException('Track not found');
    }

    this.tracks[trackIndex] = {
      ...this.tracks[trackIndex],
      ...updatedTrackData,
    };

    return this.tracks[trackIndex];
  }
  async deleteTrack(trackId: string): Promise<void> {
    if (!this.isUuid(trackId)) {
      throw new BadRequestException('Invalid track ID');
    }

    const trackIndex = this.tracks.findIndex((track) => track.id === trackId);
    if (trackIndex === -1) {
      throw new NotFoundException('Track not found');
    }

    this.tracks.splice(trackIndex, 1);
  }

  private isUuid(id: string): boolean {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(id);
  }
}
