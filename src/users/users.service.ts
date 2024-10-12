import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {

  constructor(private readonly usersRepository: UsersRepository) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findByEmail(email);
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findById(id);
  }

  async findByUsername(username: string) {
    return this.usersRepository.findByUsername(username);
  }

  async create(user: CreateUserDto) {

    const newUser = new User();
    newUser.email = user.email;
    newUser.name = user.name;

    newUser.username = await this.generateUsername(user.name);

    return this.usersRepository.createUser(newUser);
  }

  async update(user: Partial<User>) {
    return this.usersRepository.updateUser(user);
  }

  async delete(id: string) {
    return this.usersRepository.deleteUser(id);
  }
  
  private async generateUsername(name: string) {
    // Should be unique
    let username = name.toLowerCase().replace(/\s+/g, '.');
    let count = 1;
    while (await this.findByUsername(username)) {
      username = `${name.toLowerCase().replace(/\s+/g, '.')}${count}`;
      count++;
    }
    return username;
  }
}
