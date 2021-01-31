import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { CronJobModule } from './modules/cronJob/cronJob.module';
import { HealthModule } from './modules/health/health.module';
import { MeModule } from './modules/me/me.module';
import { NodemailerModule } from './modules/nodemailer/nodemailer.module';
import { RedisModule } from './modules/redis/redis.module';
import { RepositoryModule } from './modules/repository/repository.module';
import { SocketModule } from './modules/socket/socket.module';
import ormconfig = require('./ormconfig');

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),

    // module(s)
    AuthModule,
    CronJobModule,
    HealthModule,
    MeModule,
    NodemailerModule,
    RedisModule,
    RepositoryModule,
    SocketModule, // WebSockets
  ],
  controllers: [
    AppController,
  ],
})
export class AppModule { }
