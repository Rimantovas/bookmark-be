import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth0JwtGuard } from '../auth/auth0-jwt.guard';
import { GetUser } from '../auth/get-user.decorator';
import { User } from './user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(Auth0JwtGuard)
  @Get('me')
  @ApiOperation({
    summary: 'Get current user',
    operationId: 'getMyUser',
  })
  async getMyUser(@GetUser() user: User): Promise<User> {
    return user;
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a user by ID',
    operationId: 'getUser',
  })
  async getUser(@Param('id') id: string): Promise<User | null> {
    return this.usersService.findById(id);
  }
}
