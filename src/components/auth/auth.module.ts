import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import config from '../../config';
import { NotificationModule } from '../../common/modules/notification/notification.module';
import { OtpModule } from '../../common/modules/otp/otp.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Module({
  imports: [
    JwtModule.register({
      secret: config.JWT_SECRET_KEY,
      signOptions: { expiresIn: Number(config.JWT_EXP_TIME) },
    }),
    NotificationModule,
    OtpModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService],
})

export class AuthModule { }
