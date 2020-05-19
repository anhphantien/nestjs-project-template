import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Pagination = createParamDecorator((data: string, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest();
  return data ? req.pagination && req.pagination[data] : req.pagination;
});
