import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import entities = require('./entities');
require('dotenv').config();

const ormconfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: Object.values(entities),
  synchronize: process.env.NODE_ENV === 'production' ? false : true, // đồng bộ CSDL mỗi khi khởi động ứng dụng
  keepConnectionAlive: true, // không tạo kết nối mới mỗi khi khởi động lại ứng dụng
  logging: true, // hiển thị câu lệnh SQL được thực thi mỗi lần truy vấn
  logger: ['development', 'production'].includes(process.env.NODE_ENV) ? 'simple-console' : 'advanced-console',
  migrationsRun: false, // không thực hiện migration mỗi khi ứng dụng được khởi chạy
  migrations: ['migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'migrations',
  },
};
export = ormconfig;
