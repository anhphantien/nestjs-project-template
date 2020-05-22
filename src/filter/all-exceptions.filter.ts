import { Catch, ArgumentsHost } from '@nestjs/common';
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
          if (Array.isArray(message.constraints)) {
            for (const constraint of Object.values(message.constraints)) {
              messages.push(constraint);
            }
          }
          if (message.property) {
            properties.push(message.property);
          }
        }

        if (messages.length) {
          response.message = messages;
        }
        response.properties = properties.length ? properties : undefined;
      }

      res.status(status).json(response);
    } catch (error) {
      res.status(exception.status).json({
        statusCode: exception.response.statusCode,
        messages: exception.response.message,
        error: exception.response.error,
      });
    }
  }
}
