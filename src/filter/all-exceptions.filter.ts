import { Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();

    try {
      const { response, status } = exception;

      if (Array.isArray(response.message)) {
        const messages = [];
        const properties = [];

        for (const message of response.message) {
          for (const constraint of Object.values(message.constraints)) {
            messages.push(constraint);
          }
          if (message.property) {
            properties.push(message.property);
          }
        }

        response.message = messages.join(' & ');
        response.properties = properties;
      }

      res.status(status).json(response);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        messages: exception,
      });
    }
  }
}
