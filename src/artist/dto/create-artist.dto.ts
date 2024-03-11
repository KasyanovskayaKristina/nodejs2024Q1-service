import { IsNotEmpty, IsString, Length, IsBoolean } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 30)
  name: string;

  @IsBoolean()
  grammy: boolean;

  constructor({ name, grammy }: { name: string; grammy: boolean }) {
    this.name = name;
    this.grammy = grammy;
  }
}
