import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { exec } from 'child_process';

@Injectable()
export class CronjobService {
  @Cron('0 0 * * *', { name: 'backupDatabase' }) // every day at 0:00 AM
  async backupDatabase() {
    exec(`mysqldump -u root -p${process.env.DB_PASSWORD} ${process.env.DB_NAME} > ${process.env.DB_NAME}.sql`);
  }
}
