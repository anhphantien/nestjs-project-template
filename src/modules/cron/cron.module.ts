import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SocketModule } from '../socket/socket.module';
import { CronService } from './cron.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    SocketModule,
  ],
  providers: [CronService],
})
export class CronModule { }
