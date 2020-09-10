import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@ApiTags('healthcheck')
@Controller()
export class AppController {

  @Get('healthcheck')
  healthcheck(@Res() res: Response) {
    res.sendStatus(200);
  }
}
