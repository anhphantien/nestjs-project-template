/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { NODE, NODE_ENV, SENTRY_DSN } from '@/constants';
import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import sentry = require('@sentry/node');
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  constructor() {
    super();
    sentry.init({ dsn: SENTRY_DSN });
  }

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      res.status(exception.getStatus()).json(exception.getResponse());
    } else {
      if ([NODE.ENV.DEVELOPMENT, NODE.ENV.PRODUCTION].includes(NODE_ENV)) {
        const { headers, query, params, user, body, originalUrl, ip, method } =
          req;
        exception.request = {
          query,
          params,
          user,
          body,
          url: headers.origin + originalUrl,
          ip,
          method,
        };
        sentry.addBreadcrumb({ message: JSON.stringify(exception) });
        sentry.captureException(exception);
      }
      if (NODE_ENV !== NODE.ENV.PRODUCTION) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(exception);
      } else {
        res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
