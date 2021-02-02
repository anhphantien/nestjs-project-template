import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { CronModule } from './modules/cron/cron.module';
import { HealthModule } from './modules/health/health.module';
import { MeModule } from './modules/me/me.module';
import { NodemailerModule } from './modules/nodemailer/nodemailer.module';
import { RedisModule } from './modules/redis/redis.module';
import { RepositoryModule } from './modules/repository/repository.module';
import { SocketModule } from './modules/socket/socket.module';
import ormconfig from './ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),

    // module(s)
    AuthModule,
    CronModule,
    HealthModule,
    MeModule,
    NodemailerModule,
    RedisModule,
    RepositoryModule,
    SocketModule,
  ],
  controllers: [
    AppController,
  ],
})
export class AppModule { }
