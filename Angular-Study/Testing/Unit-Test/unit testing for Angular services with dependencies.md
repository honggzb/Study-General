## Testing Angular services with dependencies

### MyService

```javascript
@Injectable()
class MyService {
  constructor(private myServiceDependency: MyServiceDependency) {}

  doSomething() {
    this.myServiceDependency.getSomeValue()
  }
}
// MyServiceDependencyStub
class MyServiceDependencyStub {
  getSomeValue() {}
}
```

### Test Code

```javascript
import { MyService } from './my.service';
import { MyServiceDependency } from './my-service-dependency';

class MyServiceDependencyStub {
  getSomeValue() {}
}
describe('Service: My: TestBed', () => {
  let service: MyService;
  let myServiceDependency: MyServiceDependency;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MyService,
        { provide: MyServiceDependency, useClass: MyServiceDependencyStub }
      ]
    });
    service = TestBed.get(MyService);
    myServiceDependency = TestBed.get(MyServiceDependency);
  });

  it('should create an instance', () => {
    expect(service).toBeDefined();
  });

  it('should do something'), () => {
    spyOn(myServiceDependency, 'getSomeValue');
    service.doSomething();
    expect(myServiceDependency.getSomeValue).toHaveBeenCalled();
  });
});
```

> https://kirjai.com/testing-angular-services-with-dependencies/
