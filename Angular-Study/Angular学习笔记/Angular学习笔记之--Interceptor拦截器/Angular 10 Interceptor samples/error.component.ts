import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-error',
    template: `
        <div>
            <p>error works!</p>

            <button (click)="getData()" nz-button nzType="primary">请求接口</button>
        </div>
    `,
    styles: []
})
export class ErrorComponent implements OnInit {
    constructor(private http: HttpClient) {}

    ngOnInit(): void {}

    getData(): void {
        this.http.get('error/message').subscribe(
            (res) => console.log(res),
            (err) => console.error(err)
        );
    }
}
