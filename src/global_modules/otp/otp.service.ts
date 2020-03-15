import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { NotificationService } from '../../common/modules/notification/notification.service';
import { OTP } from '../../constants/otp';
import config from '../../config';
import { User } from '../../entities';

@Injectable()
export class OtpService {
  constructor(
    private readonly redisService: RedisService,
    private readonly notificationService: NotificationService,
  ) { }

  async canSend(recipient: string) {
    const newTimeToLive = await this.redisService.ttlAsync(`${OTP.RECIPIENT.ADMIN}:${recipient}`); // thời gian tồn tại giảm dần
    if (Number(config.OTP_TIME_TO_LIVE) - newTimeToLive > Number(config.OTP_TIME_TO_RESEND)) {
      return true;
    }
    return false;
  }

  async send(user: User, initValue: number) {
    const otp = (Math.floor(Math.random() * initValue * 9) + initValue).toString(); // tạo otp
    const recipient = user.email ? user.email : user.phone;
    await this.notificationService.otpNotification({ email: user.email, phone: user.phone }, otp);
    await this.redisService.setAsync(`${OTP.RECIPIENT.ADMIN}:${recipient}`, otp, 'ex', Number(config.OTP_TIME_TO_LIVE)); // thời gian tồn tại giảm dần
  }

  async verify(recipient: string, otp: string) {
    const storedOtp = await this.redisService.getAsync(`${OTP.RECIPIENT.ADMIN}:${recipient}`);
    if (storedOtp === otp) {
      await this.redisService.delAsync(`${OTP.RECIPIENT.ADMIN}:${recipient}`);
      return true;
    }
    return false;
  }
}
