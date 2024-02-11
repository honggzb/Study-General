import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-notify',
    template: `
        <div>
            <p>notify works!</p>

            <button (click)="getData()" nz-button nzType="primary">请求接口</button>
        </div>
    `,
    styles: []
})
export class NotifyComponent implements OnInit {
    constructor(private http: HttpClient) {}

    ngOnInit(): void {}

    getData(): void {
        const url = 'https://jsonplaceholder.typicode.com/posts/2';
        this.http.get(url).subscribe((res) => console.log(res));
    }
}
