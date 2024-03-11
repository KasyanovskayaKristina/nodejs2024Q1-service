import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 30)
  login: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 30)
  password: string;

  constructor({ login, password }: { login: string; password: string }) {
    this.login = login;
    this.password = password;
  }
}
