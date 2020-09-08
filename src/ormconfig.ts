import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import config from './config';
import entities = require('./entities');

const ormconfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: config.DATABASE_HOST,
  port: Number(config.DATABASE_PORT),
  username: config.DATABASE_USERNAME,
  password: config.DATABASE_PASSWORD,
  database: config.DATABASE_NAME,
  entities: Object.values(entities),
  synchronize: true, // đồng bộ CSDL mỗi khi khởi động ứng dụng
  keepConnectionAlive: true, // không tạo kết nối mới mỗi khi khởi động lại ứng dụng
  logging: true, // hiển thị câu lệnh SQL được thực thi mỗi lần truy vấn
  logger: config.NODE_ENV === 'production' ? 'simple-console' : 'advanced-console',
  migrationsRun: false, // không thực hiện migration mỗi khi ứng dụng được khởi chạy
  migrations: ['migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'migrations',
  },
};
export = ormconfig;
