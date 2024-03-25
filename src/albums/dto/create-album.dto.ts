import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Min,
  Max,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 30)
  name: string;

  @IsNumber()
  @Min(1)
  @Max(2024)
  year: number;

  @IsOptional()
  @IsString()
  @IsUUID(4)
  artistId: string | null;

  constructor({
    name,
    year,
    artistId = null,
  }: {
    name: string;
    year: number;
    artistId: string | null;
  }) {
    this.name = name;
    this.year = year;
    this.artistId = artistId;
  }
}
