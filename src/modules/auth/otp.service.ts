import {
  ERROR_CODE,
  OTP_LENGTH,
  OTP_TIME_TO_RESEND,
  OTP_TTL,
} from '@/constants';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { NotificationService } from '../notification/notification.service';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class OtpService {
  constructor(
    private readonly redisService: RedisService,
    private readonly notificationService: NotificationService,
  ) {}

  async send(email: string, payload: { username: string }) {
    const remainingTtl = await this.redisService.ttlAsync(email); // thời gian tồn tại còn lại
    if (OTP_TTL - remainingTtl <= OTP_TIME_TO_RESEND) {
      throw new HttpException(
        {
          statusCode: HttpStatus.TOO_MANY_REQUESTS,
          error: 'Too Many Requests',
          message: ERROR_CODE.TOO_MANY_REQUESTS_TO_RECEIVE_OTP,
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
    const otp = Math.random()
      .toString()
      .slice(2, 2 + OTP_LENGTH);
    await this.notificationService.sendOtp(email, {
      username: payload.username,
      otp,
    });
    await this.redisService.setAsync(email, otp, 'EX', OTP_TTL);
    return { message: 'OTP has been sent!' };
  }

  async verify(email: string, otp: string) {
    if (otp !== (await this.redisService.getAsync(email))) {
      throw new BadRequestException(ERROR_CODE.INVALID_OTP);
    }
    await this.redisService.delAsync(email);
  }
}
