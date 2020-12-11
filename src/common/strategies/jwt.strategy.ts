import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ERROR_CODE } from '../../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: any) {
    if (payload.exp * 1000 < Date.now()) {
      throw new UnauthorizedException(ERROR_CODE.EXPIRED_TOKEN);
    }
    return {
      id: payload.id,
      username: payload.username,
      role: payload.role,
    };
  }
}
