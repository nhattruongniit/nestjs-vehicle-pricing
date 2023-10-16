import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, rxjs } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

export class SerializeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    handle: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    return handle.handle().pipe(
      map((data: any) => {
        console.log(data);
      }),
    );
  }
}
