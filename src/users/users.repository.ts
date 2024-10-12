import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());

  }

  async findById(id: string) {
    return this.findOneBy({ id });
  }

  async findByEmail(email: string) {
    return this.findOneBy({ email });
  }

  async findByUsername(username: string) {
    return this.findOneBy({ username });
  }

  async createUser(user: User) {
    return this.save(user);
  }
  async updateUser(user: Partial<User>) {
    if (user.id) {
      return this.update(user.id, user);
    }
    throw new Error('User ID is required for update');
  }

  async deleteUser(id: string) {
    return this.delete(id);
  }
} 
