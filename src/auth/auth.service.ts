import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService, // Assume you have a UsersService to handle user data
    private readonly jwtService: JwtService,
  ) {}

  async validateAndLogin(idToken: string) {
    const auth0Domain = process.env.AUTH0_DOMAIN;

    try {
      const response = await axios.get(`${auth0Domain}userinfo`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      const userInfo = response.data;
      if (!userInfo) {
        throw new UnauthorizedException('Invalid ID token');
      }

      // Check if user exists in the database
      let user = await this.usersService.findByEmail(userInfo.email);
      if (!user) {
        // Create new user if doesn't exist
        user = await this.usersService.create({
          email: userInfo.email,
          name: userInfo.name,
        });
      }

      // Return user data
      return { user };
    } catch (error) {
      // If it's an axios error, return the response data or status
      if (axios.isAxiosError(error)) {
        const statusCode = error.response?.status || 500;
        const message =
          error.response?.data?.message ||
          'An error occurred while validating the token';
        throw new UnauthorizedException(message, String(statusCode));
      }
      // For other errors, re-throw
      throw error;
    }
  }
}
