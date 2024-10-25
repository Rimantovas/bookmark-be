import {
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth0JwtGuard } from '../auth/auth0-jwt.guard';
import { GetUser } from '../auth/get-user.decorator';
import { SearchPaginationDto } from '../shared/dto/search-pagination.dto';
import { UserResponseDto } from './dto/user-response.dto';
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
  @ApiResponse({
    status: HttpStatus.OK,
    type: User,
  })
  async getMyUser(@GetUser() user: User): Promise<User> {
    return user;
  }

  @Get('search')
  @ApiOperation({
    summary: 'Search users',
    operationId: 'searchUsers',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [UserResponseDto],
  })
  async searchUsers(
    @Query() searchParams: SearchPaginationDto,
  ): Promise<UserResponseDto[]> {
    const users = await this.usersService.searchUsers(searchParams);
    return users.map((user) => new UserResponseDto(user));
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a user by ID',
    operationId: 'getUser',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserResponseDto,
  })
  async getUser(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UserResponseDto> {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return new UserResponseDto(user);
  }
}
