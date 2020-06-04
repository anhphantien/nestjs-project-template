import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ValidationError, BadRequestException } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import config from './config';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // cho phép gọi API từ một địa chỉ URL khác

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // biến đổi các thuộc tính theo quy định trong DTO
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

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
