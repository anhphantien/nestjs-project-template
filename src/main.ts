import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import sentry = require('@sentry/node');
import config from './config';
import { SentryInterceptor } from './common/interceptors';
import { ValidationPipe, ValidationError, BadRequestException } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // cho phép gọi API từ một địa chỉ URL khác

  sentry.init({ dsn: config.SENTRY_DSN });
  app.useGlobalInterceptors(new SentryInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // biến đổi các thuộc tính nằm trong phạm vi DTO
      whitelist: true, // loại bỏ các thuộc tính nằm ngoài phạm vi DTO
      exceptionFactory: (errors: ValidationError[]) => {
        const message = [];
        for (const error of errors) {
          if (error.constraints) {
            message.push({
              field: error.property,
              message: Object.values(error.constraints).join('\n'),
            });
          } else {
            for (const childrenError of error.children) {
              if (childrenError.children.length) {
                for (const error of childrenError.children) {
                  message.push({
                    field: error.property,
                    message: Object.values(error.constraints).join('\n'),
                  });
                }
              } else {
                message.push({
                  field: error.property,
                  message: Object.values(childrenError.constraints).join('\n'),
                });
              }
            }
          }
        }
        throw new BadRequestException({
          statusCode: 400,
          message,
          error: 'Bad Request',
        });
      },
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('Standard Project Template')
    .addBearerAuth() // tạo ô nhập bearer token
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(config.PORT);
}
bootstrap();
