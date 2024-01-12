import { NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { classToPlain } from 'class-transformer';
import { map } from 'rxjs/operators';

export class TransformerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    return next.handle().pipe(map(data => classToPlain(data)));
  }
}