import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpEvent,
    HttpRequest,
    HttpHandler,
    HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable()
export class NotifyInterceptor implements HttpInterceptor {
    constructor(private nzMessageService: NzMessageService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.url.includes('posts/2')) {
            return next.handle(req);
        }

        console.log('notify interceptor');

        return next.handle(req).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse && event.status === 200) {
                    this.nzMessageService.success('调用成功！');
                }
            })
        );
    }
}
