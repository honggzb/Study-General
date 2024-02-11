import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-https',
  template: `
    <p>
      https works!
    </p>
  `,
  styles: [
  ]
})
export class HttpsComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://jsonplaceholder.typicode.com/posts/1').subscribe(res => {
      console.log('请求成功')
    })
  }

}
