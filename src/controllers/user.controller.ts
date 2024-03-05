import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import {
  CreateUserDto,
  UpdatePasswordDto,
  User,
} from 'src/interface/interface';
import { UserService } from 'src/services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    if (!this.isUuid(id)) {
      const message = 'Invalid user ID';
      throw new BadRequestException({
        message,
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const user = await this.userService.getUserById(id);

    if (!user) {
      const message = 'User not found';
      throw new NotFoundException({
        message,
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    return user;
  }

  private isUuid(id: string): boolean {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(id);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    if (!createUserDto || !createUserDto.login || !createUserDto.password) {
      const message = 'Login and password are required';
      throw new HttpException(
        { message, statusCode: HttpStatus.BAD_REQUEST },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser = await this.userService.createUser(
      createUserDto.login,
      createUserDto.password,
    );

    return newUser;
  }
  @Put(':id')
  async updateUserPassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    if (!this.isUuid(id)) {
      const message = 'Invalid user ID';
      throw new BadRequestException({
        message,
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const user = await this.userService.getUserById(id);

    if (!user) {
      const message = 'User not found';
      throw new NotFoundException({
        message,
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    if (user.password !== updatePasswordDto.oldPassword) {
      const message = 'Old password is wrong';
      throw new HttpException(
        { message, statusCode: HttpStatus.FORBIDDEN },
        HttpStatus.FORBIDDEN,
      );
    }

    user.password = updatePasswordDto.newPassword;
    user.updatedAt = Date.now();

    return user;
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: string): Promise<void> {
    if (!this.isUuid(id)) {
      const message = 'Invalid user ID';
      throw new BadRequestException({
        message,
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const user = await this.userService.getUserById(id);
    if (!user) {
      const message = 'User not found';
      throw new NotFoundException({
        message,
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    await this.userService.deleteUserById(id);
  }
}
