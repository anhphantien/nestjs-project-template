import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DNSHealthIndicator, HealthCheck, HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';
// import { createConnection } from 'typeorm';

require('dotenv').config();

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly dnsHealthIndicator: DNSHealthIndicator,
    private readonly typeormHealthIndicator: TypeOrmHealthIndicator,
  ) { }

  @Get()
  @HealthCheck()
  check() {
    return this.healthCheckService.check([
      () => this.dnsHealthIndicator.pingCheck('NestJS project template', process.env.HEALTHCHECK_URL),
      () => this.typeormHealthIndicator.pingCheck('db'),
      // async () => this.typeormHealthIndicator.pingCheck('db', {
      //   connection: await createConnection({
      //     name: 'test',
      //     type: 'mysql',
      //     host: process.env.DB_HOST,
      //     port: Number(process.env.DB_PORT),
      //     username: process.env.DB_USERNAME,
      //     password: process.env.DB_PASSWORD,
      //     database: process.env.DB_NAME,
      //   }),
      // }),
    ]);
  }
}
