import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
  NODE_ENV,
} from './constants';

const ormconfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  bigNumberStrings: false,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: NODE_ENV !== 'production',
  logging: true,
  logger: ['development', 'production'].includes(NODE_ENV)
    ? 'simple-console'
    : 'advanced-console',
  migrations: ['migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'migrations',
  },
};
export default ormconfig;
