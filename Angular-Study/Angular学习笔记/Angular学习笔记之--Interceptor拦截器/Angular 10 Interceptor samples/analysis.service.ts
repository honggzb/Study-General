import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AnalysisServcie {
    add(msg) {
        console.log(msg);
    }
}
