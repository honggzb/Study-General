[angular-in-memory-web-api](#top)
- [create a service for mocking data](#create-a-service-for-mocking-data)
- [modify app.module.ts](#modify-appmodulets)
- [Creating your Data CRUD Service](#creating-your-data-crud-service)

## create a data service for mocking data

- https://github.com/angular/in-memory-web-api
- `npm i angular-in-memory-web-api -D`

```javascript
@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService{   //implement InMemoryDbService
  constructor() { }
  //override the createDb() method
  createDb(){
   let  policies =  [
    {  id:  1,  num:  'PO1', amount: 1000, userId: 1, clientId: 1, description: 'Insurance policy number PO1' },
    {  id:  2,  num:  'PO2', amount: 2000, userId: 1, clientId: 2, description: 'Insurance policy number PO2' },
    {  id:  3,  num:  'PO3', amount: 3000, userId: 1, clientId: 3, description: 'Insurance policy number PO3' },
    {  id:  4,  num:  'PO4', amount: 4000, userId: 1, clientId: 4, description: 'Insurance policy number PO4' }
   ];
   return {policies};
  }
}
```

## configuration - modify app.module.ts

- wire the in-memory web api module with your application 
- provide the data service as a parameter for the `.forRoot` method of the InMemoryWebApiModule module

```javascript
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';  
import { DataService } from “./data.service”;
@NgModule({
   // ...
  imports: [
    //...
    InMemoryWebApiModule.forRoot(DataService)
  ]
})
export class AppModule { }
```

## Creating your Data CRUD Service to use data service

```javascript
import { Injectable } from '@angular/core';
import { HttpClient } from “@angular/common/http”;
@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  SERVER_URL: string = "http://localhost:8080/api/";
  constructor(private httpClient: HttpClient) { }

  public getPolicies(){ 
       return this.httpClient.get(this.SERVER_URL + 'policies');
  }
  public getPolicy(policyId){
       return this.httpClient.get(`${this.SERVER_URL + 'policies'}/${policyId}`); 
  }
  public createPolicy(policy: {id: number, amount: number, clientId: number, userId: number, description: string}){
      return this.httpClient.post(`${this.SERVER_URL}` + 'policies'})
  }
  public deletePolicy(policyId){
      return this.httpClient.delete(`${this.SERVER_URL + 'policies'}/${policyId}`)
  }
  public updatePolicy(policy: {id: number, amount: number, clientId: number, userId: number, description: string}){
      return this.httpClient.put(`${this.SERVER_URL + 'policies'}/${policy.id}`)
  }
}
```

> Reference
- [Angular 7|6 In-Memory Web API Tutorial | CRUD Example](https://www.techiediaries.com/angular-inmemory-web-api/)
