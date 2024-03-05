import {
  BadRequestException,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { User } from 'src/interface/interface';
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
}
