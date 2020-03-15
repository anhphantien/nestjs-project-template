import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as entities from './entities';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './components/auth/auth.module';
import { NodeMailerModule } from './global_modules/nodemailer/nodemailer.module';
import { OtpModule } from './global_modules/otp/otp.module';
import { RedisModule } from './global_modules/redis/redis.module';
import { RepositoryModule } from './global_modules/repository/repository.module';
import { TwilioModule } from './global_modules/twilio/twilio.module';
import { JwtStrategy } from './common/strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1',
      database: 'hrm',
      entities: Object.values(entities),
      synchronize: false, // không đồng bộ CSDL mỗi khi khởi động ứng dụng
      keepConnectionAlive: true, // không tạo kết nối mới mỗi khi khởi động lại ứng dụng
    }),
    PassportModule, // exports AuthGuard

    // components
    AuthModule,

    // global modules
    NodeMailerModule,
    OtpModule,
    RedisModule,
    RepositoryModule,
    TwilioModule,
  ],
  providers: [
    JwtStrategy, // extends JwtGuard
  ],
})
export class AppModule { }
