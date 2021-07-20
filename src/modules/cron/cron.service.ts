import { DB_BACKUP, DB_NAME, DB_PASSWORD, NODE, NODE_ENV } from '@/constants';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { exec } from 'child_process';
import fs = require('fs');

@Injectable()
export class CronService {
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  backupDb() {
    if ([NODE.ENV.DEVELOPMENT, NODE.ENV.PRODUCTION].includes(NODE_ENV)) {
      fs.mkdirSync(`${process.cwd()}/${DB_BACKUP}`, {
        recursive: true,
      });
      exec(
        `mysqldump -u root -p${DB_PASSWORD} ${DB_NAME} > ${DB_BACKUP}/${DB_NAME}.sql`,
      );
    }
  }
}
