import { CallHandler, ExecutionContext, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Auth0JwtGuard } from './auth0-jwt.guard';
import { Auth0Strategy } from './auth0.strategy';
import { GetUserDecoratorService } from './get-user-decorator.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UsersModule,
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    Auth0Strategy,
    Auth0JwtGuard,
    JwtService,
    GetUserDecoratorService,
    ConfigService,
    {
      provide: 'APP_INTERCEPTOR',
      useFactory: (getUserService: GetUserDecoratorService) => ({
        intercept: (context: ExecutionContext, next: CallHandler) => {
          const request = context.switchToHttp().getRequest();
          request.getUserService = getUserService;
          return next.handle();
        },
      }),
      inject: [GetUserDecoratorService],
    },
  ],
  exports: [Auth0JwtGuard, PassportModule, GetUserDecoratorService],
})
export class AuthModule {}
