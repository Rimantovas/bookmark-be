import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUserOptional = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const getUserService = request.getUserService;
    const accessToken = request.headers.authorization?.split(' ')[1];
    if (!accessToken) {
      return null;
    }
    try {
      return await getUserService.getUser(accessToken);
    } catch (error) {
      return null;
    }
  },
);
