import {
  ExceptionFilter,
  Catch,
  NotFoundException,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class NotFoundFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    console.log('Exception occurred.');
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    console.error(ctx.getRequest<Request>().url);
    if (exception.code === 'ENOENT') {
      response.status(HttpStatus.NOT_FOUND);
      console.error('Vue.js static files not found, request dropped.');
    } else {
      console.error(exception);
      console.error('This request was found, but it produced an error!!!');
    }
    response.status(status);
    if (status == HttpStatus.UNAUTHORIZED) {
      response.json({
        statusCode: status,
        error: exception.code,
        message: '401 Unauthorized',
      });
    } else {
      response.json({
        statusCode: status,
        error: exception.code,
        message: 'Something went wrong!',
      });
    }

  }
}
