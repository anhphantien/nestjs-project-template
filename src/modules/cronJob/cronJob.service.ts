import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { exec } from 'child_process';
import fs = require('fs');
import { SocketGateway } from '../socket/socket.gateway';

require('dotenv').config();

@Injectable()
export class CronJobService {
  constructor(private readonly socketGateway: SocketGateway) { }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  backupDb() {
    if (process.env.NODE_ENV === 'production') {
      fs.mkdirSync(`${process.cwd()}/backup`, { recursive: true });
      exec(`mysqldump -u root -p${process.env.DB_PASSWORD} ${process.env.DB_NAME} > backup/${process.env.DB_NAME}.sql`);
    }
  }

  @Cron(CronExpression.EVERY_MINUTE)
  handleNewNotifications(room: string, data: any) {
    this.socketGateway.handleNewNotifications(room, data);
  }
}
