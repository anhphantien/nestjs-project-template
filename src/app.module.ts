import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './config';
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
      host: config.DATABASE_HOST,
      port: Number(config.DATABASE_PORT),
      username: config.DATABASE_USER,
      password: config.DATABASE_PASS,
      database: config.DATABASE_NAME,
      entities: Object.values(entities),
      synchronize: JSON.parse(config.DATABASE_SYNC), // không đồng bộ CSDL mỗi khi khởi động ứng dụng
      keepConnectionAlive: JSON.parse(config.DATABASE_KCA), // không tạo kết nối mới mỗi khi khởi động lại ứng dụng
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
