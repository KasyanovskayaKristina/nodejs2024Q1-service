import { CreateUserDto } from '../dto/create-user.dto';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Fav } from 'src/favourites/entity/fav.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ length: 255 })
  login: string;

  @Column()
  password: string;

  @Column({ default: 1 })
  version: number;

  @OneToMany(() => Fav, (fav) => fav.user)
  favs: Fav[];

  constructor(createUserDto?: CreateUserDto) {
    if (createUserDto) {
      this.login = createUserDto.login;
      this.password = createUserDto.password;
    }
  }

  public updatePassword(newPass: string): void {
    this.password = newPass;
    this.version += 1;
  }
}
