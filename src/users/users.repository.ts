import { Injectable } from '@nestjs/common';
import { UserRole } from 'src/shared/enums/user-role.enum';
import { DataSource, Repository } from 'typeorm';
import { SearchPaginationDto } from '../shared/dto/search-pagination.dto';
import { User } from './user.entity';

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

  async searchUsers(searchParams: SearchPaginationDto): Promise<User[]> {
    const { query, page, limit } = searchParams;
    const queryBuilder = this.createQueryBuilder('user');

    if (query) {
      queryBuilder.where(
        'user.name ILIKE :query OR user.username ILIKE :query',
        { query: `%${query}%` },
      );
    }

    queryBuilder
      .orderBy('user.createdAt', 'DESC')
      .addOrderBy('user.updatedAt', 'DESC')
      .skip(((page ?? 1) - 1) * (limit ?? 10))
      .take(limit ?? 10);

    return queryBuilder.getMany();
  }

  async changeMyRole(user: User, role: UserRole): Promise<User> {
    await this.update(user.id, { role });

    const updatedUser = await this.findOneBy({ id: user.id });
    if (!updatedUser) {
      throw new Error('User not found');
    }
    return updatedUser;
  }
}
