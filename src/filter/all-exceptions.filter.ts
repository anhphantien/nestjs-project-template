import { Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();

    try {
      const { response, status } = exception;
      const messages = [];
      const properties = [];
      for (const message of response.message) {
        properties.push(message.property);
        for (const constraint of Object.values(message.constraints)) {
          messages.push(constraint);
        }
      }
      response.properties = properties;
      response.message = messages;

      res.status(status).json(response);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        messages: exception,
      });
    }
  }
}
