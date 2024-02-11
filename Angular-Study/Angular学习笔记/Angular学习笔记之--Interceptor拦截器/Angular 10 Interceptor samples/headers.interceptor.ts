import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.url.includes('headers')) {
            return next.handle(req);
        }

        console.log('headers interceptor');

        const reqClone = req.clone({
            setHeaders: { 'X-man': 'hello man' }
        });

        return next.handle(reqClone);
    }
}
