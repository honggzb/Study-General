import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-analysis',
    template: `
        <div>
            <p>analysis works!</p>

            <button (click)="getData(1)" nz-button nzType="primary">success</button>
            <button (click)="getData(2)" nz-button nzType="primary">error</button>
        </div>
    `,
    styles: []
})
export class AnalysisComponent implements OnInit {
    constructor(private http: HttpClient) {}

    ngOnInit(): void {}

    getData(type): void {
        if (type === 1) {
            const url = 'https://jsonplaceholder.typicode.com/users/1';
            this.http.get(url).subscribe((res) => {});
        } else {
            const url = 'analysis';
            this.http.get(url).subscribe(
                (res) => {},
                (err) => console.error(err)
            );
        }
    }
}
