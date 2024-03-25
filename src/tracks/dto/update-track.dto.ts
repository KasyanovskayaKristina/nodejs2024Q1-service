import {
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class UpdateTrackDto {
  @IsOptional()
  @IsString()
  @Length(1, 50)
  name?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(1000)
  duration?: number;

  @IsOptional()
  @IsString()
  artistId?: string;

  @IsOptional()
  @IsString()
  albumId?: string;
}
