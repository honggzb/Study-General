import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpEvent,
    HttpRequest,
    HttpHandler,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private nzMessageService: NzMessageService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.url.includes('error')) {
            return next.handle(req);
        }

        console.log('error interceptor');

        return next.handle(req).pipe(
            retry(2),
            catchError((err: HttpErrorResponse) => {
                if (err.status !== 401) {
                    this.nzMessageService.error(err.message);
                }

                return throwError(err);
            })
        );
    }
}
