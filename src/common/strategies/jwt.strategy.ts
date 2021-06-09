import { ERROR_CODE, USER } from '@/constants';
import { UserRepository } from '@/repositories';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IUser } from '../interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET,
      // passReqToCallback: true,
    });
  }

  async validate(payload: IUser) {
    if (payload.exp * 1000 < Date.now()) {
      throw new UnauthorizedException(ERROR_CODE.EXPIRED_TOKEN);
    }
    const user = await this.userRepository.findOne({ id: payload.id });
    if (!user) {
      throw new NotFoundException(ERROR_CODE.USER_NOT_FOUND);
    }
    if (user.status === USER.STATUS.NOT_ACTIVATED) {
      throw new UnauthorizedException(ERROR_CODE.USER_NOT_ACTIVATED);
    }
    if (user.status === USER.STATUS.IS_DISABLED) {
      throw new ForbiddenException(ERROR_CODE.DISABLED_USER);
    }
    return payload;
  }
}
