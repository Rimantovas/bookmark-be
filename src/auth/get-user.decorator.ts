import {
  createParamDecorator,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { UsersService } from '../users/users.service';

@Injectable()
export class GetUserDecoratorService {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
  ) {}

  async getUser(accessToken: string) {
    try {
      console.log('1');
      const auth0Domain = this.configService.get<string>('AUTH0_DOMAIN');
      console.log('2');
      const response = await axios.get(`${auth0Domain}userinfo`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('3');
      console.log(response.data);
      const userInfo = response.data;
      let user = await this.usersService.findByEmail(userInfo.email);
      console.log('4');
      return user;
    } catch (error) {
      throw new UnauthorizedException('Unable to get user information');
    }
  }
}

export const GET_USER_DECORATOR_SERVICE = 'GET_USER_DECORATOR_SERVICE';

export const GetUser = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const getUserService = request.getUserService;
    const accessToken = request.headers.authorization?.split(' ')[1];
    if (!accessToken) {
      throw new Error('No access token provided');
    }
    return getUserService.getUser(accessToken);
  },
);
