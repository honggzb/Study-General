import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { AnalysisServcie } from '../services/analysis.service';

@Injectable()
export class AnalysisInterceptor implements HttpInterceptor {
    constructor(private analysisService: AnalysisServcie) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.url.includes('analysis') && !req.url.includes('users/1')) {
            return next.handle(req);
        }

        console.log('analysis interceptor');
        const start = Date.now();
        let ok: string;

        return next.handle(req).pipe(
            tap(
                (event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        ok = 'success';
                    }
                },
                (error) => (ok = 'faild')
            ),

            finalize(() => {
                const duration = Date.now() - start;
                const msg = `${req.method} "${req.urlWithParams}" ${ok} in ${duration}ms`;
                this.analysisService.add(msg);
            })
        );
    }
}
