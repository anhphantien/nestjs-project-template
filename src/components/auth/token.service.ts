import { Injectable, BadRequestException } from '@nestjs/common';
import { RedisService } from '../../global_modules/redis/redis.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '../../common/interfaces';
import { v4 as uuidv4 } from 'uuid';
import config from '../../config';
import { ERROR_CODE } from '../../constants';

@Injectable()
export class TokenService {
  constructor(
    private readonly redisService: RedisService,
    private readonly jwtService: JwtService,
  ) { }

  async createToken(payload: IUser, requireRefreshToken = true) {
    const accessToken = this.jwtService.sign(payload);
    if (!requireRefreshToken) {
      return { accessToken, refreshToken: null };
    }
    const refreshToken = uuidv4();
    await this.redisService.setAsync(
      refreshToken,
      accessToken,
      'ex', // lưu trữ với thời gian giảm dần là giây
      // 'px', // lưu trữ với thời gian giảm dần là mili giây
      Number(config.REFRESH_TOKEN_TTL),
    );
    return { accessToken, refreshToken };
  }

  async decodeAccessTokenByRefreshToken(refreshToken: string) {
    const accessToken = await this.redisService.getAsync(
      refreshToken,
    );
    if (!accessToken) {
      throw new BadRequestException(ERROR_CODE.INVALID_REFRESH_TOKEN);
    }
    return this.jwtService.verify(accessToken, { ignoreExpiration: true });
  }

  async deleteRefreshToken(refreshToken: string) {
    return this.redisService.delAsync(refreshToken);
  }
}
