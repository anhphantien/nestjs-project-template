import { CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor } from '@nestjs/common';
import sentry = require('@sentry/minimal');
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import config from '../../config';

@Injectable()
export class SentryInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap(null, (exception) => {
        if (config.NODE_ENV === 'production' && !(exception instanceof HttpException)) {
          const { query, params, user, body, url, method } = context.switchToHttp().getRequest();
          exception.request = { query, params, user, body, url, method };
          sentry.addBreadcrumb({ message: JSON.stringify(exception) });
          sentry.captureException(exception);
        }
      }),
    );
  }
}
