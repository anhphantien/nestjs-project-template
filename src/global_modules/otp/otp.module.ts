import { Global, Module } from '@nestjs/common';
import { NotificationModule } from '../../common/modules/notification/notification.module';
import { OtpService } from './otp.service';

@Global()
@Module({
  imports: [NotificationModule],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule { }
