import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(4, 30)
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 30)
  newPassword: string;
  constructor({
    oldPassword,
    newPassword,
  }: {
    oldPassword: string;
    newPassword: string;
  }) {
    this.oldPassword = oldPassword;
    this.newPassword = newPassword;
  }
}
