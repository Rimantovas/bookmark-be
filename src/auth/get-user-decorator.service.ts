import { Injectable, UnauthorizedException } from '@nestjs/common';
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
      const auth0Domain = this.configService.get<string>('AUTH0_DOMAIN');
      const response = await axios.get(`${auth0Domain}userinfo`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const userInfo = response.data;
      let user = await this.usersService.findByEmail(userInfo.email);
      return user;
    } catch (error) {
      throw new UnauthorizedException('Unable to get user information');
    }
  }
}
