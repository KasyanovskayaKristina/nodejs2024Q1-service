import { IsNotEmpty, IsString, Length, IsBoolean } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 30)
  name: string;

  @IsBoolean()
  grammy: boolean;
}
