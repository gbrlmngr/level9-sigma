import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

export interface Response<T> {
  _code: string;
  _timestamp: Date;
}

export const DEFAULT_SUCCESS_RESPONSE_CODE = 'SUCCESS';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => ({
        _code: data?._code ?? DEFAULT_SUCCESS_RESPONSE_CODE,
        _timestamp: new Date(),
        ...data,
      })),
    );
  }
}
