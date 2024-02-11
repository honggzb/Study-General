import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    constructor(private loaderService: LoaderService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // https://jsonplaceholder.typicode.com/albums/1
        if (!req.url.includes('albums')) {
            return next.handle(req);
        }

        console.log('loaderInterceptor');

        this.loaderService.show();

        return next.handle(req).pipe(
            delay(3000),
            finalize(() => this.loaderService.hide())
        );
    }
}
