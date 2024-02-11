import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-mock',
    template: `
        <div>
            <p>mock works!</p>

            <button (click)="getData()" nz-button nzType="primary">请求接口</button>
        </div>
    `,
    styles: []
})
export class MockComponent implements OnInit {
    constructor(private http: HttpClient) {}

    ngOnInit(): void {}

    getData() {
        this.http.get('/mock').subscribe((res) => {
            console.log('mock', res);
        });
    }
}
