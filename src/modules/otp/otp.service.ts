import { Injectable } from '@nestjs/common';
import { RedisService } from '../../global_modules/redis/redis.service';
import { NotificationService } from '../notification/notification.service';
require('dotenv').config();

@Injectable()
export class OtpService {
  constructor(
    private readonly redisService: RedisService,
    private readonly notificationService: NotificationService,
  ) { }

  async canSend(email: string) {
    const currentTtl = await this.redisService.ttlAsync(email); // thời gian tồn tại còn lại
    if (Number(process.env.OTP_TTL) - currentTtl > Number(process.env.OTP_TIME_TO_RESEND)) {
      return true;
    }
    return false;
  }

  async send(email: string, initValue: number) {
    const otp = (Math.trunc(Math.random() * initValue * 9) + initValue).toString(); // tạo otp
    await this.notificationService.otpNotification(email, otp);
    await this.redisService.setAsync(email, otp, 'EX', Number(process.env.OTP_TTL));
  }

  async verify(email: string, otp: string) {
    const storedOtp = await this.redisService.getAsync(email);
    if (storedOtp === otp) {
      await this.redisService.delAsync(email);
      return true;
    }
    return false;
  }
}
