import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Auth0JwtGuard } from './auth0-jwt.guard';
import { Auth0Strategy } from './auth0.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, Auth0Strategy, Auth0JwtGuard],
  exports: [Auth0JwtGuard],
})
export class AuthModule {}
