import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-convert',
    template: `
        <div>
            <p>convert works!</p>

            <button (click)="getData()" nz-button nzType="primary">请求接口</button>
            <div>
                <h1>request</h1>
                <!-- | 有意思的写法。 pipe 管道  https://angular.cn/guide/pipes -->
                <p>{{ requestObj | json }}</p>
                <h1>response</h1>
                <p>{{ response | async | json }}</p>
            </div>
        </div>
    `,
    styles: []
})
export class ConvertComponent implements OnInit {
    requestObj = {
        Title: 'Mr',
        Name: 'Cool Cat',
        Id: 1
    };

    response;

    constructor(private http: HttpClient) {}

    ngOnInit(): void {}
    getData() {
        const url = 'https://jsonplaceholder.typicode.com/comments/1';
        this.response = this.http.put(url, this.requestObj);
    }
}
