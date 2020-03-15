import { Injectable, BadRequestException } from '@nestjs/common';
import { RedisService } from '../../global_modules/redis/redis.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '../../common/interfaces';
import * as uuidv4 from 'uuid/v4';
import { REFRESH_TOKEN } from '../../constants/refreshToken';
import { ERROR_CODE } from '../../constants';

@Injectable()
export class TokenService {
  constructor(
    private readonly redisService: RedisService,
    private readonly jwtService: JwtService,
  ) { }

  async createToken(tokenPayload: IUser, requireRefreshToken = true) {
    const accessToken = this.jwtService.sign(tokenPayload);
    if (!requireRefreshToken) {
      return { accessToken, refreshToken: null };
    }
    const refreshToken = uuidv4();
    await this.redisService.setAsync(
      `${REFRESH_TOKEN.SIGN.ADMIN}:${refreshToken}`,
      accessToken,
      'ex', // lưu trữ với thời gian giảm dần là giây
      // 'px', // lưu trữ với thời gian giảm dần là mili giây
      REFRESH_TOKEN.TTL.ADMIN,
    );
    return { accessToken, refreshToken };
  }

  async decodeAccessTokenByRefreshToken(refreshToken: string) {
    const accessToken = await this.redisService.getAsync(
      `${REFRESH_TOKEN.SIGN.ADMIN}:${refreshToken}`,
    );
    if (!accessToken) {
      throw new BadRequestException(ERROR_CODE.INVALID_REFRESH_TOKEN);
    }
    return this.jwtService.verify(accessToken, { ignoreExpiration: true });
  }

  async deleteRefreshToken(refreshToken: string) {
    return this.redisService.delAsync(`${REFRESH_TOKEN.SIGN.ADMIN}:${refreshToken}`);
  }
}
