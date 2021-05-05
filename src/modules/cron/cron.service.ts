import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { exec } from 'child_process';
import 'dotenv/config';
import fs = require('fs');

@Injectable()
export class CronService {
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  backupDb() {
    if (['development', 'production'].includes(process.env.NODE_ENV)) {
      fs.mkdirSync(`${process.cwd()}/${process.env.DB_BACKUP}`, { recursive: true });
      exec(`mysqldump -u root -p${process.env.DB_PASSWORD} ${process.env.DB_NAME} > ${process.env.DB_BACKUP}/${process.env.DB_NAME}.sql`);
    }
  }
}
