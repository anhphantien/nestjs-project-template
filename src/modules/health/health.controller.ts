import { APP_NAME, HEALTHCHECK_URL } from '@/constants';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
// import { createConnection } from 'typeorm';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly httpHealthIndicator: HttpHealthIndicator,
    private readonly typeormHealthIndicator: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.healthCheckService.check([
      () => this.httpHealthIndicator.pingCheck(APP_NAME, HEALTHCHECK_URL),
      () => this.typeormHealthIndicator.pingCheck('db'),
      // async () => this.typeormHealthIndicator.pingCheck('db', {
      //   connection: await createConnection({
      //     name: 'test',
      //     type: 'mysql',
      //     host: DB_HOST,
      //     port: DB_PORT,
      //     username: DB_USERNAME,
      //     password: DB_PASSWORD,
      //     database: DB_NAME,
      //   }),
      // }),
    ]);
  }
}
