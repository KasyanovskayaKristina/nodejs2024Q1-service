import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { Track } from 'src/interface/interface';
import { TrackService } from 'src/services/track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  async getAllTracks(): Promise<{ tracks: Track[]; statusCode: number }> {
    const tracks = await this.trackService.getAllTracks();
    return { tracks, statusCode: 200 };
  }
  @Get(':id')
  async getTrackById(
    @Param('id') trackId: string,
  ): Promise<{ track: Track; statusCode: number }> {
    try {
      const track = await this.trackService.getTrackById(trackId);
      return { track, statusCode: 200 };
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
  async addTrack(
    @Body() trackData: { name: string; duration: number },
  ): Promise<{ track: Track; statusCode: number }> {
    const { name, duration } = trackData;
    const newTrack = await this.trackService.addTrack(name, duration);
    return { track: newTrack, statusCode: 201 };
  }
  @Put(':id')
  async updateTrack(
    @Param('id') trackId: string,
    @Body() updatedTrackData: Partial<Track>,
  ): Promise<{ track: Track; statusCode: number }> {
    try {
      const updatedTrack = await this.trackService.updateTrack(
        trackId,
        updatedTrackData,
      );
      return { track: updatedTrack, statusCode: 200 };
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
  async deleteTrack(@Param('id') trackId: string): Promise<void> {
    try {
      await this.trackService.deleteTrack(trackId);
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
}
