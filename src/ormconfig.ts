import config from './config';
import * as entities from './entities';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const ormconfig: TypeOrmModuleOptions = {
  type: 'mariadb',
  host: config.DATABASE_HOST,
  port: Number(config.DATABASE_PORT),
  username: config.DATABASE_USERNAME,
  password: config.DATABASE_PASSWORD,
  database: config.DATABASE_NAME,
  entities: Object.values(entities),
  synchronize: true, // đồng bộ CSDL mỗi khi khởi động ứng dụng
  keepConnectionAlive: true, // không tạo kết nối mới mỗi khi khởi động lại ứng dụng
  migrationsRun: false, // không thực hiện migration mỗi khi ứng dụng được khởi chạy
  migrations: ['migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'migrations',
  },
  // multipleStatements: true, // cho phép thực thi nhiều câu lệnh SQL trong mỗi truy vấn
};
export = ormconfig;
