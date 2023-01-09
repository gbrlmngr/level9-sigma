import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

export interface Response<T> {
  meta: Record<string, any>;
  data: T;
}

export const DEFAULT_SUCCESS_RESPONSE_CODE = 'success';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => ({
        meta: {
          timestamp: new Date().toISOString(),
          code: data?._code ?? DEFAULT_SUCCESS_RESPONSE_CODE,
        },
        data,
      })),
    );
  }
}
