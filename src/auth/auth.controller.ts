import {
  Controller,
  Get,
  Headers,
  NotFoundException,
  Param,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserRole } from '../shared/enums/user-role.enum';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'User login',
    operationId: 'login',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful login',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async login(@Headers('authorization') authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid authorization header');
    }

    const accessToken = authHeader.split(' ')[1];
    return this.authService.validateAndLogin(accessToken);
  }

  @Get('role/:userId')
  @ApiOperation({
    summary: 'Get user role',
    operationId: 'getUserRole',
  })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'ID of the user',
    schema: { type: 'string' },
  })
  @ApiResponse({
    status: 200,
    description: 'User role',
    schema: {
      type: 'object',
      properties: {
        role: {
          type: 'string',
          enum: Object.values(UserRole),
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async getUserRole(@Param('userId') userId: string) {
    const role = await this.authService.getUserRole(userId);
    if (!role) {
      throw new NotFoundException('User not found');
    }
    return { role };
  }
}
