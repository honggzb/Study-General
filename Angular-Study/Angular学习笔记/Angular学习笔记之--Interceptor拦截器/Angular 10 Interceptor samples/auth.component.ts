import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-auth',
    template: `
        <div>
            <p>auth works!</p>

            <button (click)="getData()" nz-button nzType="primary">请求接口</button>
        </div>
    `,
    styles: []
})
export class AuthComponent implements OnInit {
    constructor(private http: HttpClient) {}

    ngOnInit(): void {}

    getData() {
        const url = 'https://jsonplaceholder.typicode.com/todos/2';
        this.http.get(url).subscribe((res) => {
            console.log('cache', res);
        });
    }
}
