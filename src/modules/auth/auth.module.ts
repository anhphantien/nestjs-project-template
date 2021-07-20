import { JwtStrategy } from '@/common/strategies';
import { JWT_EXPIRES_IN, JWT_SECRET } from '@/constants';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { NotificationModule } from '../notification/notification.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { OtpService } from './otp.service';
import { TokenService } from './token.service';

@Module({
  imports: [
    NotificationModule,
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRES_IN },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService, OtpService, JwtStrategy],
})
export class AuthModule {}
