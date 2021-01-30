import { IUser } from '@/common/interfaces';
import { ERROR_CODE } from '@/constants';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { RedisService } from '../redis/redis.service';

require('dotenv').config();

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) { }

  async createToken(payload: IUser, requireRefreshToken = true) {
    const accessToken = this.jwtService.sign(payload);
    if (!requireRefreshToken) {
      return { accessToken };
    }
    const refreshToken = uuidv4();
    await this.redisService.setAsync(
      refreshToken,
      accessToken,
      'EX', // lưu trữ với thời gian giảm dần là giây
      // 'PX', // lưu trữ với thời gian giảm dần là mili giây
      Number(process.env.REFRESH_TOKEN_TTL),
    );
    return { accessToken, refreshToken };
  }

  async decodeAccessToken(refreshToken: string) {
    const accessToken = await this.redisService.getAsync(refreshToken);
    if (!accessToken) {
      throw new BadRequestException(ERROR_CODE.INVALID_REFRESH_TOKEN);
    }
    try {
      return this.jwtService.verify(accessToken, { ignoreExpiration: true });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  deleteRefreshToken(refreshToken: string) {
    return this.redisService.delAsync(refreshToken);
  }
}
