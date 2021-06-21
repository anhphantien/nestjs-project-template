import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const ormconfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  bigNumberStrings: false,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: process.env.NODE_ENV === 'production' ? false : true,
  logging: true,
  logger: ['development', 'production'].includes(process.env.NODE_ENV)
    ? 'simple-console'
    : 'advanced-console',
  migrations: ['migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'migrations',
  },
};
export default ormconfig;
