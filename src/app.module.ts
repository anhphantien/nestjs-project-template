import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from './ormconfig';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './components/auth/auth.module';
import { NodeMailerModule } from './global_modules/nodemailer/nodemailer.module';
import { OtpModule } from './global_modules/otp/otp.module';
import { RedisModule } from './global_modules/redis/redis.module';
import { RepositoryModule } from './global_modules/repository/repository.module';
import { TwilioModule } from './global_modules/twilio/twilio.module';
import { JwtStrategy } from './common/strategies';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
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
