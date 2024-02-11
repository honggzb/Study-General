import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
    selector: 'app-loader',
    template: `
        <div>
            <p>loader works!</p>

            <button (click)="getData()" nz-button nzType="primary">请求接口</button>

            <div *ngIf="loaderService.loading" class="loader"></div>
            <!-- 两种方式都可以
            <div *ngIf="isLoading" class="loader"></div>
            -->
        </div>
    `,
    styles: [
        `
            .loader {
                border: 16px solid #f3f3f3; /* Light grey */
                border-top: 16px solid #3498db; /* Blue */
                border-radius: 50%;
                width: 100px;
                height: 100px;
                animation: spin 2s linear infinite;
            }

            @keyframes spin {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
        `
    ]
})
export class LoaderComponent implements OnInit {
    // public 是第一次用
    constructor(public loaderService: LoaderService, private http: HttpClient) {}

    get isLoading() {
        return this.loaderService.loading;
    }

    ngOnInit(): void {}

    getData(): void {
        const url = 'https://jsonplaceholder.typicode.com/albums/1';
        this.http.get(url).subscribe((res) => console.log(res));
    }
}
