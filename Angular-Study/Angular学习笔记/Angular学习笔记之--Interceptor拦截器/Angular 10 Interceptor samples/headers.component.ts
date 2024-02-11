import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-headers',
    template: `
        <div>
            <p>headers works!</p>

            <button (click)="getData()" nz-button nzType="primary">请求接口</button>
        </div>
    `,
    styles: []
})
export class HeadersComponent implements OnInit {
    constructor(private http: HttpClient) {}

    ngOnInit(): void {}

    getData(): void {
        // 虽然请求会报错，但是查看 dev tools 中 request header 中能够发现 X-man: hello man
        this.http.get('headers/new/data').subscribe(
            (res) => console.log(res),
            (err) => console.error(err)
        );
    }
}
