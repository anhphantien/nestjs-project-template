import { Module } from '@nestjs/common';

import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig = require( './ormconfig');

import { AuthModule } from './components/auth/auth.module';

import { NodeMailerModule } from './global_modules/nodemailer/nodemailer.module';
import { RedisModule } from './global_modules/redis/redis.module';
import { RepositoryModule } from './global_modules/repository/repository.module';
import { TwilioModule } from './global_modules/twilio/twilio.module';

import { JwtStrategy } from './common/strategies';

@Module({
  imports: [
    PassportModule, // exports AuthGuard
    TypeOrmModule.forRoot(ormconfig),

    // components
    AuthModule,

    // global modules
    NodeMailerModule,
    RedisModule,
    RepositoryModule,
    TwilioModule,
  ],
  providers: [
    JwtStrategy, // extends JwtGuard
  ],
})
export class AppModule { }
