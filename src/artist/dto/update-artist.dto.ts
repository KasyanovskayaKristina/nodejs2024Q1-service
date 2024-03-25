import {
  IsOptional,
  IsString,
  IsNotEmpty,
  Length,
  IsBoolean,
} from 'class-validator';

export class UpdateArtistDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(2, 30)
  name?: string;

  @IsOptional()
  @IsBoolean()
  grammy?: boolean;
}
