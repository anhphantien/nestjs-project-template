import { ERROR_CODE } from '@/constants';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = [
      ...(this.reflector.get<number[]>('roles', context.getClass()) || []),
      ...(this.reflector.get<number[]>('roles', context.getHandler()) || []),
    ];
    const { user } = context.switchToHttp().getRequest();
    if (!roles.includes(user.role)) {
      throw new ForbiddenException(ERROR_CODE.PERMISSION_DENIED);
    }
    return true;
  }
}
