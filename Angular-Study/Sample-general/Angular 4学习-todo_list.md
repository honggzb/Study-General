[Angular to-do App](#top)

|component |function |
| :------------- | :------------- |
| todo class|todos model|
|todoDataService|crud todos|
|json-server | api server |

```shell
ng new todo-app
#1) Todo Class
ng g class Todo --spec   #创建class同时创建unit test
#2) TodoDataService
ng g service todo-data
#3) modifying app.component
#4) component tod display todos
  ng g service todo-list # a TodoListComponent to display a list of todos
  ng g c todo-list # a TodoListItemComponent to display a single todo
  ng g c todo-list-header # a TodoListHeaderComponent to create a new todo
  ng g c todo-list-footer # a TodoListFooterComponent to show how many todos are left.
  ng g c todos # 
  ng g c page-not-found  #
```

![application architecture](https://i.imgur.com/J9pSJX6.png)

### RestAPI - creating backend RestAPI

```shell
#5) Mock Rest API backend using json-server
  npm install json-server -g
  npm install json-server --save
  # create db.json in root directory
  # in package.json
  #"scripts:" {
  #  "json-server": "json-server -p 4000 --watch db.json"
  #}
  npm run json-server
  # create apimockservice for unit test
  ng g service ApiMock --spec false
```

- adding to `/environments/environment.ts` and `/environments/environment.prod.ts`:  `apiUrl: 'http://localhost:4000'   // URL of development API
`

### service - using backend RestAPI

`ng generate service Api --module app.module.ts`

- it will
  - installing service
  - create src/app/api.service.spec.ts
  - create src/app/api.service.ts
  - update src/app/app.module.ts
- using backend api by modifying api.service.ts

```javascript
import { environment } from 'environments/environment';
//... 
const API_URL = environment.apiUrl;
//...
return this.http.get(API_URL+'/todos')...
```

Build project:  `ng build --aot --environment prod`

### routing

**JavaScript routing Concept**

- routing is often handled by a JavaScript router in single-page applications (SPAs), a JavaScript router does two things:
  - update the web application state when the browser URL changes
  - update the browser URL when the web application state changes
- Angular routing packaged as @angular/router, Angular Router takes care of the duties of a JavaScript router:
  - it activates all required Angular components to compose a page when a user navigates to a certain URL
  - it lets users navigate from one page to another without page reload
  - it updates the browser’s history so the user can use the back and forward buttons when navigating back and forth between pages.
- In addition, Angular Router allows us to:
  - redirect a URL to another URL
  - resolve data before a page is displayed
  - run scripts when a page is activated or deactivated
  - lazy load parts of our application.


> Reference
- [Part 0— The Ultimate Angular CLI Reference Guide](https://www.sitepoint.com/ultimate-angular-cli-reference/)
- [Part 1— Getting our first version of the Todo application up and running](https://www.sitepoint.com/angular-2-tutorial/)
- [Part 2— Creating separate components to display a list of todos and a single todo](https://www.sitepoint.com/understanding-component-architecture-angular/)
- [Part 3— Update the Todo service to communicate with a REST API](https://www.sitepoint.com/angular-rxjs-create-api-service-rest-backend/)
- [Part 4— Use Angular router to resolve data](https://www.sitepoint.com/component-routing-angular-router/)
- [the 7-step routing process of Angular Router navigation](https://www.jvandemo.com/the-7-step-process-of-angular-router-navigation/)
- [Angular todo app](https://github.com/sitepoint-editors/angular-todo-app/tree/part-4)
- [Angular 2 Todo App code](https://github.com/sitepoint-editors/angular-todo-app/tree/part-4)
