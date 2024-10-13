import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersRepository } from 'src/users/users.repository';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Auth0JwtGuard } from './auth0-jwt.guard';
import { Auth0Strategy } from './auth0.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), ConfigModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    Auth0Strategy,
    Auth0JwtGuard,
    UsersService,
    JwtService,
    UsersRepository,
  ],
  exports: [Auth0JwtGuard],
})
export class AuthModule {}
