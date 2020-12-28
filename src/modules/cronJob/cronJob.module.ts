import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SocketModule } from '../socket/socket.module';
import { CronJobService } from './cronJob.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    SocketModule,
  ],
  providers: [CronJobService],
})
export class CronJobModule { }
