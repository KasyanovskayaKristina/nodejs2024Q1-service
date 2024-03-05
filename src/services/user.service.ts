import { Injectable } from '@nestjs/common';
import { User } from 'src/interface/interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  private readonly users: User[] = [
    {
      id: '1',
      login: 'User 1',
      password: 'password1',
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: '2',
      login: 'User 2',
      password: 'password2',
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: '3',
      login: 'User 3',
      password: 'password3',
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  ];

  // Добавила нового пользователя
  async addUser(login: string, password: string): Promise<User> {
    const newUser: User = {
      id: uuidv4(),
      login,
      password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(newUser);
    return newUser;
  }

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }

  async getUserById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  async createUser(login: string, password: string): Promise<User> {
    const newUser: User = {
      id: uuidv4(),
      login,
      password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(newUser);
    return newUser;
  }

  async deleteUserById(id: string): Promise<void> {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }
}
