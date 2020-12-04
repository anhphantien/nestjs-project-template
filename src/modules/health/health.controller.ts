import { Controller, Get } from '@nestjs/common';
import { DNSHealthIndicator, HealthCheck, HealthCheckService } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private healthCheckService: HealthCheckService,
    private dnsHealthIndicator: DNSHealthIndicator,
  ) { }

  @Get()
  @HealthCheck()
  check() {
    return this.healthCheckService.check([
      () => this.dnsHealthIndicator.pingCheck('Standard Project Template', 'http://localhost:3000/healthcheck'),
    ]);
  }
}
