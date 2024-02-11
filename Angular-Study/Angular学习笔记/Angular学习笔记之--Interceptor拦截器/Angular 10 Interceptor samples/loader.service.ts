import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    loading;

    hide() {
        this.loading = false;
    }

    show() {
        this.loading = true;
    }
}
