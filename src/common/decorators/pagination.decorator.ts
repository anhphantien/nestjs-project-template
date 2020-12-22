import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Pagination = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  return data ? req.pagination && req.pagination[data] : req.pagination;
});
