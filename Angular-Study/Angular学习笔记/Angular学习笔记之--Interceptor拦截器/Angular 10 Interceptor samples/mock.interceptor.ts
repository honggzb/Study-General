import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class MockInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<HttpEvent<any>>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.url.includes('/mock')) {
            return next.handle(req);
        }

        console.log('mock interceptor');

        const body = { firstName: 'llcing', lastName: 'llccing' };
        return of(new HttpResponse({ status: 200, body: body }));
    }
}
