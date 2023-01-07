import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

export const DEFAULT_EXCEPTION_RESPONSE_CODE = 'exception';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse();
    let responseBody = {};

    if (typeof exceptionResponse === 'object') {
      responseBody = {
        _code:
          (exceptionResponse as Record<string, any>)._code ??
          DEFAULT_EXCEPTION_RESPONSE_CODE,
        message: (exceptionResponse as Record<string, any>).message ?? null,
      };
    } else {
      responseBody = {
        _code: DEFAULT_EXCEPTION_RESPONSE_CODE,
        message: exceptionResponse ?? null,
      };
    }

    response.status(status).json({
      _timestamp: new Date().toISOString(),
      ...responseBody,
    });
  }
}
