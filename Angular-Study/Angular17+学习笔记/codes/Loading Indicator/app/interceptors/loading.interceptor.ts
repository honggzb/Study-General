import { HttpContextToken, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoadingService } from "../service/loading.service";
import { finalize, Observable } from "rxjs";

// Don't turn on the loading indicator for certain HTTP requests
export const SkipLoading = new HttpContextToken<boolean>(() => false);

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    constructor(private loadingService: LoadingService) {
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(req.context.get(SkipLoading)) {
            return next.handle(req);
        }
        this.loadingService.loadingOn();
        return next.handle(req).pipe(
            finalize(() => {
                this.loadingService.loadingOff();
            })
        )
    }
}
