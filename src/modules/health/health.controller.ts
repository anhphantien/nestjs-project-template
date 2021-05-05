import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService, HttpHealthIndicator, TypeOrmHealthIndicator } from '@nestjs/terminus';
// import { createConnection } from 'typeorm';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly httpHealthIndicator: HttpHealthIndicator,
    private readonly typeormHealthIndicator: TypeOrmHealthIndicator,
  ) { }

  @Get()
  @HealthCheck()
  check() {
    return this.healthCheckService.check([
      () => this.httpHealthIndicator.pingCheck(process.env.APP_NAME, process.env.HEALTHCHECK_URL),
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
