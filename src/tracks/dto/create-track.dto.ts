import {
  Length,
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  Max,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  name: string;

  @IsNumber()
  @Min(1)
  @Max(1000)
  duration: number;

  @IsOptional()
  @IsString()
  @IsUUID(4)
  artistId: string | null;

  @IsOptional()
  @IsString()
  @IsUUID(4)
  albumId: string | null;

  constructor({
    name,
    duration,
    artistId = null,
    albumId = null,
  }: {
    name: string;
    duration: number;
    artistId: string | null;
    albumId: string | null;
  }) {
    this.name = name;
    this.duration = duration;
    this.artistId = artistId;
    this.albumId = albumId;
  }
}
