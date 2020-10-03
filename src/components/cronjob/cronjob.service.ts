import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { exec } from 'child_process';
import config from '../../config';

@Injectable()
export class CronjobService {
  @Cron('0 0 * * *', { name: 'backupDatabase' }) // every day at 0:00 AM
  async backupDatabase() {
    exec(`mysqldump -u root -p${config.DATABASE_PASSWORD} ${config.DATABASE_NAME} > ${config.DATABASE_NAME}.sql`);
  }
}
