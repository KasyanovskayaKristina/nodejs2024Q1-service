import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';

@Module({
  imports: [DbModule],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
