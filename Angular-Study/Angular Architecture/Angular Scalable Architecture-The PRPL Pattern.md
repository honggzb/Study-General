[Angular Scalable Architecture - The PRPL Pattern](#top)
- [PRPL Pattern](#prpl-pattern)
  - [App structure](#app-structure)
  - [Build](#build)
    - [Background: HTTP/2 and HTTP/2 server push](#background-http2-and-http2-server-push)
    - [Build output](#build-output)
- [Sandbox Principle](#sandbox-principle)
  - [abstract to difference layers](#abstract-to-difference-layers)
  - [State management layer](#state-management-layer)
    - [Components should not know about the state management layer](#components-should-not-know-about-the-state-management-layer)
    - [HTTP services should not know about the state management layer](#http-services-should-not-know-about-the-state-management-layer)
  - [Sandbox Method](#sandbox-method)

## PRPL Pattern

> https://developers.google.com/web/fundamentals/performance/prpl-pattern

**PRPL** is a pattern for structuring and serving Progressive Web Apps (PWAs), with an emphasis on the performance of app delivery and launch

- **Push** critical resources for the initial URL route
- **Render** initial route
- **Pre-cache** remaining routes
- **Lazy-load** and create remaining routes on demand

### App structure

- The main entrypoint of the application which is served from every valid route
- The shell or app-shell, which includes the top-level app logic, router, and so on
- App entrypoint
  - entrypoint must import and instantiate the shell, as well as conditionally load any required polyfills.
  - The main considerations for the entrypoint are:
    - Has minimal static dependencies, in other words, not much beyond the app-shell itself
    - Conditionally loads required polyfills
    - Uses absolute paths for all dependencies
- App Shell:
  - responsible for routing and usually includes the main navigation UI for the app
  - should contain everything needed for first paint
- Lazily loaded fragments of the app, When the user switches routes, the app
  - lazy-loads any required resources that haven't been cached yet, and creates the required views
  - Repeat visits to routes should be immediately interactive

![](https://i.imgur.com/pNM5MP3.png)


### Build

#### Background: HTTP/2 and HTTP/2 server push

- HTTP/2 allows multiplexed downloads over a single connection, so that multiple small files can be downloaded more efficiently.
- HTTP/2 server push allows the server to preemptively send resources to the browser

#### Build output

PRPL suggest producing two builds:

- An unbundled build designed for server/browser combinations that support HTTP/2 to deliver the resources the browser needs for a fast first paint while optimizing caching. The delivery of these resources can be triggered efficiently using `<link rel="preload">` or HTTP/2 Push.
- A bundled build designed to minimize the number of round-trips required to get the application running on server/browser combinations that don't support server push

![](https://i.imgur.com/wG7vfKj.png)

- Any dependency shared by two or more fragments is bundled with the shell and its static dependencies
- Each fragment and its unshared static dependencies are bundled into a single bundle

[back to top](#top)

## Sandbox Principle

- [Sandbox principle]http://www.slideshare.net/nzakas/scalable-javascript-application-architecture)-[Nicholas Zakas](https://twitter.com/slicknet) acts like a dispatcher between different modules where a module is like a smart component
- a sandbox is a way to decouple the **presentation layer from the application logic**

### abstract to difference layers

```javascript
// abstraction component
export class MyComponent{
	constructor(private abstraction: SomeAbstractionType){
	}

	doSomething(): void{
	this.abstraction.doSomething();
}
```

![](https://i.imgur.com/gnFSMgR.png)

### State management layer

#### Components should not know about the state management layer

- Dumb components and smart components shouldn’t know any other state management layer for that matter. They should not care how state is being managed.
- The responsibility of the presentation layer is **“to present”** and **“to delegate”**.

```javascript
export class MyComponent{
    // component should not know who populates the stream-users$, foo$, bar$
	users$ = this.facade.users$;
	foo$ = this.facade.foo$;
	bar$ = this.facade.bar$;

	constructor(private facade: ...){
	}

	addUser(user: User): void{
		this.facade.addUser(user);
	}
	removeUser(userId: string): void{
		this.facade.removeUser(userId)
	}
}
```

#### HTTP services should not know about the state management layer

```javascript
export class UserService{
	constructor(private http: Http){ }
	// just let the consumer of this service handle the store interaction
	// this will just return a stream of users
	fetchUsers(): Observable<Array<User>>{
		return this.http.get("...").map(...)
	}
}
```

### Sandbox Method

![](https://i.imgur.com/EDEtZxJ.png)

The Advantages:

- Decoupling the presentation layer from the rest
- Abstracting away the state management layer
- Bbetter encapsulation, Components cannot just use and break whatever they want
- Can switch to a different kind of state management without rewriting services and components

[back to top](#top)
