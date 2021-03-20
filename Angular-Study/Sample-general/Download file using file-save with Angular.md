[Download file using file-save with Angular](#top)

- [Front End codes](#front-end-codes)
- [Implement REST API](#implement-rest-api)

## Front End codes

```javascript
import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { saveAs } from 'file-saver/FileSaver';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: Http) { }
  saveFile() {
    const headers = new Headers();
    headers.append('Accept', 'text/plain');
    this.http.get('/api/files', { headers: headers })
      .toPromise()
      .then(response => this.saveToFileSystem(response));
  }
  private saveToFileSystem(response) {
    const contentDispositionHeader: string = response.headers.get('Content-Disposition');
    const parts: string[] = contentDispositionHeader.split(';');
    const filename = parts[1].split('=')[1];
    const blob = new Blob([response._body], { type: 'text/plain' });
    saveAs(blob, filename);
  }
}
```

 ## Implement REST API

```java
package com.example.filesavebackend;

import java.util.Collections;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@SpringBootApplication
public class Application {
  public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurerAdapter() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry
                        .addMapping("/api/**")
                        .allowedOrigins("http://localhost:4200")
                        .allowedMethods("*");
            }
        };
    }
}

@RestController
class FileResource {
    @GetMapping(path = "/api/files", produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity getFile() {
        String exportedContent = "Hello, World!";
        String filename = "my-file.txt";
        HttpHeaders headers = new HttpHeaders();
        headers.setAccessControlExposeHeaders(Collections.singletonList("Content-Disposition"));
        headers.set("Content-Disposition", "attachment; filename=" + filename);
        return new ResponseEntity<>(exportedContent, headers, HttpStatus.OK);
    }
}
```

> Reference
- https://github.com/shekhargulati/filesave-angular4-example
- [Implementing file save functionality with Angular 4](https://shekhargulati.com/2017/07/16/implementing-file-save-functionality-with-angular-4/)
- https://www.npmjs.com/package/file-saver
