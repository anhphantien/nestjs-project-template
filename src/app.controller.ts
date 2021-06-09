import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('')
@Controller()
export class AppController {
  @Get('healthcheck')
  healthcheck(@Res() res: Response) {
    res.sendStatus(HttpStatus.OK);
  }
}
