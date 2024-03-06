import { Module } from '@nestjs/common';
import { ArtistController } from 'src/controllers/artist.controller';
import { ArtistService } from 'src/services/artist.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
