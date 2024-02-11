import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
    private cache = new Map<string, any>();

    intercept(req: HttpRequest<HttpEvent<any>>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.url.includes('todos/2')) {
            return next.handle(req);
        }

        console.log('cache interceptor');

        // 仅处理 get 请求
        if (req.method !== 'GET') {
            return next.handle(req);
        }

        const cacheResponse = this.cache.get(req.url);
        if (cacheResponse) {
            return of(cacheResponse);
        }

        return next.handle(req).pipe(
            tap((event) => {
                if (event instanceof HttpResponse) {
                    this.cache.set(req.url, event);
                }
            })
        );
    }
}
