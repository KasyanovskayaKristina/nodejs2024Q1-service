import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './tracks/track.module';
import { AlbumModule } from './albums/album.module';
import { DbModule } from './db/db.module';
import { FavoriteModule } from './favourites/favorites.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FavoriteModule,
    UserModule,
    ArtistModule,
    TrackModule,
    AlbumModule,
    DbModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
