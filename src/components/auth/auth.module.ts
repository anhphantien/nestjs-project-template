import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import config from '../../config';
import { NotificationModule } from '../../common/modules/notification/notification.module';

@Module({
  imports: [
    JwtModule.register({
      secret: config.JWT_SECRET_KEY,
      signOptions: { expiresIn: Number(config.JWT_EXP_TIME) },
    }),
    NotificationModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService],
})

export class AuthModule { }
