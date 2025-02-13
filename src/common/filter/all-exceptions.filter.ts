import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { ResponseDto } from './response.dto';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status = 500;
        let message = 'Internal server error';
        let exceptionResponse: any = exception.message;

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const responseData = exception.getResponse();
            message = responseData['message'] || responseData;
            exceptionResponse = responseData;
        }
        status = status==500 ? status: 200;
        const responseDto = new ResponseDto(null, message, exceptionResponse);
        response.status(status).json(responseDto);
    }
}
