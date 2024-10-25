import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class Auth0JwtGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    console.log('Auth0JwtGuard: canActivate called');
    console.log(
      `Auth0JwtGuard: canActivate`,
      context.switchToHttp().getRequest().headers,
    );
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    console.log('Auth0JwtGuard: handleRequest called', { err, user, info });
    if (err || !user) {
      throw err || new UnauthorizedException('Unable to authenticate user');
    }
    return user;
  }
}
