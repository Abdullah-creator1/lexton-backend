import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map, catchError } from 'rxjs';
import { ResponseDto } from '../filter/response.dto';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ResponseDto<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseDto<T>> {
        return next.handle().pipe(
            map((data) => new ResponseDto(data)),
            catchError((error) => {
                throw error;
            })
        );
    }
}
