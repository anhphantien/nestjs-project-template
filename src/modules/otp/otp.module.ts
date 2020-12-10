import { Module } from '@nestjs/common';
import { NotificationModule } from '../notification/notification.module';
import { OtpService } from './otp.service';

@Module({
  imports: [NotificationModule],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule { }
