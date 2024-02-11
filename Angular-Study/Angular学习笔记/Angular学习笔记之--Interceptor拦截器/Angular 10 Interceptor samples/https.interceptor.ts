import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class HttpsInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // 路径不匹配，则直接进入其他拦截器
        if (!req.url.includes('posts/1')) {
            return next.handle(req);
        }

        console.log('httpsInterceptor');

        const httpsReq = req.clone({
            url: req.url.replace('http://', 'https://')
        });
        return next.handle(httpsReq);
    }
}
