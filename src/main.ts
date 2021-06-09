import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.enableCors(); // cho phép gọi API từ một địa chỉ URL khác

  app.useGlobalFilters(new AllExceptionsFilter());

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
              message: Object.values(error.constraints).join('; '),
            });
          } else {
            for (const childError of error.children) {
              if (childError.constraints) {
                message.push({
                  field: error.property,
                  message: Object.values(childError.constraints).join('; '),
                });
              } else {
                for (const grandChildError of childError.children) {
                  message.push({
                    field: grandChildError.property,
                    message: Object.values(grandChildError.constraints).join('; '),
                  });
                }
              }
            }
          }
        }
        throw new BadRequestException(message);
      },
    }),
  );

  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle(process.env.APP_NAME)
      .addBearerAuth() // tạo ô nhập token
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(process.env.PORT);
};
void bootstrap();
