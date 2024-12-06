- Subject是微信公众号，Observable是微信用户
- 1个Subject可以对应n个不同的Observable，Observable只要向Subject要求接收，每次Subject的更新都能即时收到。
- 就如1个微信公众号可以有n个没用必然关系的微信用户，只要微信用户关注了微信公众号，每次微信公众号的更新都能及时收到。

|Observable|Subject|
|---|---|
|unicast<br>each subscribed Observer owns an independent execution of the Observable|multicast<br>can be multicast to many Observers|
||like Event Emitters: they maintain a registry of many listeners|
|each subscribed observer has its own execution of the obsevable.<br>When you subscribe to an observable|maintain a list of observables(subscribed) <br> and notify all of them whenever a new value is emitted|
|Declarative, they represent a blueprint for a data stream<br>but not produce values until a subscriber subscribes to them|Imperative,they can produce values independently of whether there are any subscribers|
|do not have initial value.<br>They start emitting values only whne a subscriber is listenting|Some subjects, like BehaviorSubject, have initial value.<br>When subscribe to a BehaviorSubject, it will immediately emit the last value it received <br>or the initial value if no vlaue has been emitted yet to the subscriber|
|need to be explicitly subscribed to in order to start receiving data.<br>Subscriptions need to be managed carefully to avoid memory leaks by unscubscribing when no longer needed|require subscription management just like regular Observable<br>Properly unsubscribe from subjects when they are no longer needed to prevent memory leaks|
|Are genereally used when u want ot produce data in a lazy and declarative way, <br>such as handling HTTP requests, user input events, or other asynchronous data sources|Sre commonly used in secnarios where u want to multicast events or share data between subscribers,<br>such as inter-componentn communication or event broadcasting|

```javascript
//使用Subject和Observable，来取得http请求的response，并显示
//user-login.service.ts
export class UserLoginService {  
    //微信公众号(Subject)
    public subject: Subject<UserModel> = new Subject<UserModel>();
    constructor(public http:Http) {
        console.log("Angular2---------UserLoginService.constructor");
    }
    //给微信用户(Observable)关注提供的方法
    public get currentUser():Observable<UserModel>{
        return this.subject.asObservable();
    }
    public login(user: UserModel) {
       console.log("Angular2---------UserLoginService.login");
       let body = JSON.stringify(user);
       return this.http.post("http://172.28.197.13:8899/login", body)
                  .map((response: Response) => {
                      let userResponseJson = new UserModel();
                      userResponseJson = response.json();
                      //微信公众号(Subject)更新
                      this.subject.next(Object.assign({}, userResponseJson));
                      localStorage.setItem("currentUser",JSON.stringify(userResponseJson));
                      if (userResponseJson && !userResponseJson.errCode) {
                          console.log("Angular2---------UserLoginService.login SUCCESSED");
                      } else {
                          console.log("Angular2---------UserLoginService.login FAILED");
                      }
                      return response;
                  })
                  .subscribe(
                          data => {
                              console.log("Angular2---------UserLoginService.login subscribe data : " + JSON.stringify(data.json()));
                          },
                          error => {
                              console.log("Angular2---------UserLoginService.login err");
                              console.error(error);
                          }
                  );
    }
}
//user-login.component.ts
export class UserLoginComponent implements OnInit {
    public errorMessage: string = "";    
    public userModel: UserModel = new UserModel();
    public currentUser: UserModel;
    constructor(public userLoginService: UserLoginService) {
        console.log("Angular2---------UserLoginComponent.constructor");
    }
    ngOnInit() {
        console.log("Angular2---------UserLoginComponent.ngOnInit");
        //执行微信用户(Observable)关注操作(就是那个[给微信用户(Observable)关注提供的方法])。
        //每次微信公众号(Subject)有更新，以下subscribe中的处理都会重复执行。
        this.userLoginService.currentUser.subscribe(
                data => {
                    this.currentUser = data;
                    console.log("Angular2---------UserLoginComponent.ngOnInit data : " + JSON.stringify(data));
                    if(this.currentUser) {
                        this.errorMessage = this.currentUser.errMsg;
                    }
                }
         )
    }
    public doLogin():void {
        console.log("Angular2---------UserLoginComponent.doLogin"); 
        this.userLoginService.login(this.userModel);
    }
}
```

[Angular学习：Subject和Observable](https://blog.csdn.net/superpeepi_csdn/article/details/72673122)
