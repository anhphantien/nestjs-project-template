import { Module } from '@nestjs/common';

import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig = require('./ormconfig');

import { AuthModule } from './modules/auth/auth.module';
import { CronjobModule } from './modules/cronjob/cronjob.module';

import { NodeMailerModule } from './global_modules/nodemailer/nodemailer.module';
import { RedisModule } from './global_modules/redis/redis.module';
import { RepositoryModule } from './global_modules/repository/repository.module';

import { AppController } from './app.controller';

import { JwtStrategy } from './common/strategies';

@Module({
  imports: [
    PassportModule, // exports AuthGuard
    TypeOrmModule.forRoot(ormconfig),

    // module(s)
    AuthModule,
    CronjobModule, // cronjob

    // global module(s)
    NodeMailerModule,
    RedisModule,
    RepositoryModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    JwtStrategy, // extends JwtGuard
  ],
})
export class AppModule { }
