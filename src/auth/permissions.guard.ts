import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../shared/enums/user-role.enum';
import { GetUserDecoratorService } from './get-user-decorator.service';
import { InsufficientPermissionsException } from './insufficient-permissions.exception';
import { REQUIRED_PERMISSIONS_KEY } from './require-permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private getUserDecoratorService: GetUserDecoratorService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      REQUIRED_PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const accessToken = request.headers.authorization?.split(' ')[1];
    if (!accessToken) {
      throw new InsufficientPermissionsException('No access token provided');
    }
    const user = await this.getUserDecoratorService.getUser(accessToken);

    const hasPermission = requiredRoles.some((role) => user?.role === role);
    if (!hasPermission) {
      throw new InsufficientPermissionsException();
    }

    return true;
  }
}
