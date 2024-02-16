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
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    console.error(ctx.getRequest<Request>().url);
    console.error('Vue.js static files not found, request dropped.');
    if (exception.code === 'ENOENT') {
      response.status(HttpStatus.NOT_FOUND);
    }
    response.status(status);
  }
}
