import { Controller, Get } from '@nestjs/common';
import { DNSHealthIndicator, HealthCheck, HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';
// import { createConnection } from 'typeorm';

// require('dotenv').config();

@Controller('health')
export class HealthController {
  constructor(
    private healthCheckService: HealthCheckService,
    private dnsHealthIndicator: DNSHealthIndicator,
    private typeormHealthIndicator: TypeOrmHealthIndicator,
  ) { }

  @Get()
  @HealthCheck()
  async check() {
    return this.healthCheckService.check([
      () => this.dnsHealthIndicator.pingCheck('Standard Project Template', 'http://localhost:3000/healthcheck'),
      () => this.typeormHealthIndicator.pingCheck('database'),
      // async () => this.typeormHealthIndicator.pingCheck('database', {
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