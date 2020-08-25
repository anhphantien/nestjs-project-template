import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ValidationError, BadRequestException } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import config from './config';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // cho phép gọi API từ một địa chỉ URL khác

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // biến đổi các thuộc tính nằm trong phạm vi DTO
      whitelist: true, // loại bỏ các thuộc tính nằm ngoài phạm vi DTO'
      exceptionFactory: (errors: ValidationError[]) => {
        const message = [];
        for (const error of errors) {
          message.push({
            property: error.property,
            constraints: error.constraints,
          });
        }
        return new BadRequestException(message);
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
