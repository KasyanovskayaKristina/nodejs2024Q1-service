import { v4 as uuid } from 'uuid';
import { CreateUserDto } from '../dto/create-user.dto';

const getTimeStamp = (): number => Date.now();

export class User {
  public readonly id: string = uuid();
  public readonly createdAt: number = getTimeStamp();
  public readonly login: string;
  public password: string;
  public version = 1;
  public updatedAt: number = this.createdAt;

  constructor({ password, login }: CreateUserDto) {
    this.login = login;
    this.password = password;
  }

  public updatePassword(newPass: string) {
    this.password = newPass;
    this.version += 1;
    this.updatedAt = getTimeStamp();
  }
}
