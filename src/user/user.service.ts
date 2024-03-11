import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { validate } from 'class-validator';
import { validate as uuidValidate } from 'uuid';
import { DbService } from 'src/db/db.service';
import { formatValidationErrors } from 'src/errors/error';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DbService) {}

  async create(createUserDto: CreateUserDto) {
    await this.validateDto(new CreateUserDto(createUserDto));
    const newUser = await this.databaseService.addNewUser(createUserDto);
    return newUser;
  }

  findAll() {
    return this.databaseService.listUsers();
  }

  async findOne(id: string) {
    this.validateUuid(id);
    const user = await this.databaseService.findUserById(id);
    if (!user) throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    this.validateUuid(id);
    await this.validateDto(new UpdateUserDto(updateUserDto));

    const user = await this.databaseService.findUserById(id);
    if (!user) throw new HttpException('User not found.', HttpStatus.NOT_FOUND);

    if (updateUserDto.oldPassword !== user.password) {
      throw new HttpException('Incorrect password.', HttpStatus.FORBIDDEN);
    }

    const updatedUser = await this.databaseService.changeUserPassword(
      user,
      updateUserDto.newPassword,
    );
    return updatedUser;
  }

  async remove(id: string) {
    this.validateUuid(id);
    const userExists = await this.databaseService.findUserById(id);
    if (!userExists)
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);

    await this.databaseService.removeUserById(id);
  }

  private async validateDto(dto: any) {
    const validationErrors = await validate(dto);
    if (validationErrors.length > 0) {
      const msg = formatValidationErrors(validationErrors);
      throw new HttpException(msg, HttpStatus.BAD_REQUEST);
    }
  }

  private validateUuid(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'Invalid ID format. Please provide a valid UUID.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
