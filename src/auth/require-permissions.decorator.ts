import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../shared/enums/user-role.enum';

export const REQUIRED_PERMISSIONS_KEY = 'requiredPermissions';
export const RequirePermissions = (...roles: UserRole[]) =>
  SetMetadata(REQUIRED_PERMISSIONS_KEY, roles);
