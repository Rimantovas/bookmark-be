import { createParamDecorator, ExecutionContext } from '@nestjs/common';

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
