import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((data: string, req: any) => {
  return data ? req.user && req.user[data] : req.user;
});
