import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ERROR_CODE } from '../../constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getClass());
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!roles.includes(user.role)) {
      throw new ForbiddenException(ERROR_CODE.ACCESS_DENIED);
    }
    return true;
  }
}
