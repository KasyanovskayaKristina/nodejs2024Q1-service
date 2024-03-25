import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FavoriteService } from 'src/favourites/favorite.service';

@Controller('favs/:userId')
export class FavoriteController {
  constructor(private readonly favService: FavoriteService) {}

  @Get()
  findAllFavorites(@Param('userId') userId: string) {
    return this.favService.findAllFavs(userId);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('artist/:artistId')
  addArtistToFavorites(
    @Param('userId') userId: string,
    @Param('artistId') artistId: string,
  ) {
    return this.favService.addArtistToFavs(userId, artistId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('artist/:artistId')
  removeArtistFromFavorites(
    @Param('userId') userId: string,
    @Param('artistId') artistId: string,
  ) {
    return this.favService.removeArtistFromFavs(userId, artistId);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('album/:albumId')
  addAlbumToFavorites(
    @Param('userId') userId: string,
    @Param('albumId') albumId: string,
  ) {
    return this.favService.addAlbumToFavs(userId, albumId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('album/:albumId')
  removeAlbumFromFavorites(
    @Param('userId') userId: string,
    @Param('albumId') albumId: string,
  ) {
    return this.favService.removeAlbumFromFavs(userId, albumId);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('track/:trackId')
  addTrackToFavorites(
    @Param('userId') userId: string,
    @Param('trackId') trackId: string,
  ) {
    return this.favService.addTrackToFavs(userId, trackId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('track/:trackId')
  removeTrackFromFavorites(
    @Param('userId') userId: string,
    @Param('trackId') trackId: string,
  ) {
    return this.favService.removeTrackFromFavs(userId, trackId);
  }
}
