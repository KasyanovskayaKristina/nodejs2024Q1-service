import {
  IsString,
  IsNotEmpty,
  Length,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class UpdateArtistDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(2, 30)
  name: string;

  @IsOptional()
  @IsBoolean()
  grammy: boolean;

  constructor({ name, grammy }: { name: string; grammy: boolean }) {
    this.name = name;
    this.grammy = grammy;
  }
}
