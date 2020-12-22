import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { JwtStrategy } from './common/strategies';
import { AuthModule } from './modules/auth/auth.module';
import { CronjobModule } from './modules/cronjob/cronjob.module';
import { HealthModule } from './modules/health/health.module';
import { NodeMailerModule } from './modules/nodemailer/nodemailer.module';
import { RedisModule } from './modules/redis/redis.module';
import { RepositoryModule } from './modules/repository/repository.module';
import ormconfig = require('./ormconfig');

@Module({
  imports: [
    PassportModule, // exports AuthGuard
    TypeOrmModule.forRoot(ormconfig),

    // module(s)
    AuthModule,
    CronjobModule, // cronjob
    HealthModule,
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
