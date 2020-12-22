import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { exec } from 'child_process';
import fs = require('fs');

require('dotenv').config();

@Injectable()
export class CronjobService {
  @Cron('0 0 * * *') // every day at 0:00 AM
  backupDb() {
    fs.mkdirSync(`${process.cwd()}/backup`, { recursive: true });
    exec(`mysqldump -u root -p${process.env.DB_PASSWORD} ${process.env.DB_NAME} > backup/${process.env.DB_NAME}.sql`);
  }
}
