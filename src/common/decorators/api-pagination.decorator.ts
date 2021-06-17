import { ApiQuery } from '@nestjs/swagger';

export const ApiPagination =
  () =>
  <T>(
    // eslint-disable-next-line @typescript-eslint/ban-types
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<T>,
  ) => {
    ApiQuery({ name: 'size', type: 'number' })(target, propertyKey, descriptor);
    ApiQuery({ name: 'page', type: 'number' })(target, propertyKey, descriptor);
    ApiQuery({ name: 'keyword', type: 'string', required: false })(
      target,
      propertyKey,
      descriptor,
    );
    ApiQuery({ name: 'filter', type: 'string', required: false })(
      target,
      propertyKey,
      descriptor,
    );
    ApiQuery({ name: 'sort', type: 'string', required: false })(
      target,
      propertyKey,
      descriptor,
    );
  };
