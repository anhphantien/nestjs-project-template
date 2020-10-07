import { Injectable } from '@nestjs/common';
import { RedisService } from '../../../global_modules/redis/redis.service';
import { NotificationService } from '../notification/notification.service';
import { User } from '../../../entities';

@Injectable()
export class OtpService {
  constructor(
    private readonly redisService: RedisService,
    private readonly notificationService: NotificationService,
  ) { }

  async canSend(recipient: string) {
    const currentTimeToLive = await this.redisService.ttlAsync(recipient); // thời gian tồn tại còn lại
    if (Number(process.env.OTP_TTL) - currentTimeToLive > Number(process.env.OTP_TIME_TO_RESEND)) {
      return true;
    }
    return false;
  }

  async send(user: User, initValue: number) {
    const otp = (Math.trunc(Math.random() * initValue * 9) + initValue).toString(); // tạo otp
    const recipient = user.email ? user.email : user.phone;
    await this.notificationService.otpNotification({ email: user.email, phone: user.phone }, otp);
    await this.redisService.setAsync(recipient, otp, 'EX', Number(process.env.OTP_TTL));
  }

  async verify(recipient: string, otp: string) {
    const storedOtp = await this.redisService.getAsync(recipient);
    if (storedOtp === otp) {
      await this.redisService.delAsync(recipient);
      return true;
    }
    return false;
  }
}
