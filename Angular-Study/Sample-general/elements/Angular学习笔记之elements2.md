[Using angular elements](#top)

- [Create angular component and turn it to element](#create-angular-component-and-turn-it-to-element)
  - [Convert A Component Into Custom Element](#convert-a-component-into-custom-element)
  - [Compiling as a Standalone Element](#compiling-as-a-standalone-element)
  - [DEBUG issue - Angular “fails to construct the HTMLElement” error](#debug-issue---angular-fails-to-construct-the-htmlelement-error)
- [Communicating with Angular Elements](#communicating-with-angular-elements)
  - [pass attribute by using input](#pass-attribute-by-using-input)
  - [event handling by using EventEmitter and output](#event-handling-by-using-eventemitter-and-output)
- [Angular element working inside a React app](#angular-element-working-inside-a-react-app)
- [Multiple Components](#multiple-components)

## Create angular component and turn it to element

### Convert A Component Into Custom Element

1. create a new component, helloWorld component
2. modify and add `entryComponents: [HelloWorldComponent]` to app.module.ts
3. add `createCustomElement` and `customElements.define` in app.module.ts

```javascript
//app.module.ts
constructor(injector: Injector) {
    const custom = createCustomElement(HelloWorldComponent, {injector: injector});
    customElements.define('hello-world', custom);
  }
```

### Compiling as a Standalone Element

1. modify app.module.ts
   1. remove AppCompent from declarations field
   2. remove bootstrap field
   3. add ngDoBootstrap() inside AppModule class to tell angular to handle the bootrapping
2. delete all appComponent files, app.component.css, app.component.html, app.component.spec.ts and app.component.ts
3. create a folder in root directory, such as preview folder
4. create a shell script in root directory to build and combine all the files
5. create index.html file in preview folder
6. Now you an open index.html in browser

```javascript
//custombuild.sh
ng build --prod --output-hashing=none && cat dist/myElements/runtime-es5.js dist/myElements/runtime-es2015.js dist/myElements/polyfills-es5.js dist/myElements/polyfills-es2015.js dist/myElements/main-es5.js dist/myElements/main-es2015.js > preview/angularapp.js
//index.html
<script src="./angularapp.js"></script>
<hello-world></hello-world>
```

### DEBUG issue - Angular “fails to construct the HTMLElement” error

To solve this issue, install the webcomponentjs polyfills:
- `ng add @webcomponents/webcomponentsjs`
- Then, go to the polyfills.ts file and import the following: `import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js';`

## Communicating with Angular Elements

### pass attribute by using input

```javascript
//hello-world.component.html
<div><h1>{{title}}</h1></div>
//hello-world.component.ts
export class HelloWorldComponent implements OnInit {
  //...
  @Input() title;
}
//index.html
<hello-world title="another test"></hello-world>
```

### event handling by using EventEmitter and output

```javascript
//hello-world.component.html
<div>
    <h1>{{title}}</h1>
    <button (click)="showInfo()">Display</button>
</div>
//hello-world.component.ts
export class HelloWorldComponent implements OnInit {
  //...
  @Input() title;
  @Input() rname;
  @Input() occupation;
  @Input() location;
  @Input() first;
  @Output() display = new EventEmitter();

  showInfo(){
    this.display.emit(`
    Name: ${this.rname}
    Occupation: ${this.occupation}
    Based in: ${this.location}
    First Appearance: ${this.first}`);
  }
}
//index.html
<hello-world
        title="another test"
        rname="Bruce Wayne"
        occupation="World's Greatest Detective"
        location="Gotham"
        first="Detective Comics #27"></hello-world>
<script>
const component = document.querySelector('hello-world');
component.addEventListener('display', (event) => {
    alert(event.detail);
})
</script>
```

[back to top](#top)

## Angular element working inside a React app

1. create a react project, `create-react-app angular-react`
2. copy angularapp.js to react project folder - public folder
3. add angularapp.js to public/index.html, `<script src="./angularapp.js"></script>`
4. modify src/app.js
   1. turn app.js to component class
   2. add `ref={this.handleClick}`
   3. add handeClick(), showInfo() function
   4. addEventLister in componentDidMount and removeEventListener in componentWillUnmount
5. run `yarn start`

```javascript
//app.js
import React, {Component} from 'react';
import './App.css';
class App extends Component {  // 1) Turn to component class
  render(){
    return (
      <div className="App">
        <hello-world
          title="Batman"
          rname="Bruce Wayne"
          occupation="World's Greatest Detective"
          location="Gotham"
          first="Detective Comics #27"
          ref={this.handleClick}></hello-world>  // 2) add ref
      </div>
    );
  }
  handleClick = component => {
    this.component = component;
  }
  showInfo(event) {
    alert(event.detail);
  }
  componentDidMount() {
    this.component.addEventListener('display', this.showInfo);
  }
  componentWillUnmount() {
    this.component.removeEventListener('display', this.showInfo);
  }
}
export default App;
```

## Multiple Components

steps same as single compontents

[back to top](#top)

> References
- https://github.com/rajatk16/angular-element-1
- https://blog.bitsrc.io/using-angular-elements-why-and-how-part-1-35f7fd4f0457
- https://blog.bitsrc.io/using-angular-elements-why-and-how-part-2-37d52e71b4f9