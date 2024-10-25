import { ForbiddenException } from '@nestjs/common';

export class InsufficientPermissionsException extends ForbiddenException {
  constructor(
    message: string = 'Insufficient permissions. Premium role is required',
  ) {
    super(message);
  }
}
