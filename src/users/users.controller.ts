import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Auth0JwtGuard } from '../auth/auth0-jwt.guard';
import { GetUser } from '../auth/get-user.decorator';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(Auth0JwtGuard)
  @Get('me')
  async getMyUser(@GetUser() user: User): Promise<User> {
    return user;
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User | null> {
    return this.usersService.findById(id);
  }
}
