import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {

  @Get('healthcheck')
  healthcheck(@Res() res: Response) {
    res.sendStatus(200);
  }
}
