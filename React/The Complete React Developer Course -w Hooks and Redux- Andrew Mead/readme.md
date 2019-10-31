[The Complete React Developer Course -w Hooks and Redux- Andrew Mead](#top)

- [Environment setup](#environment-setup)
- [Basic concept](#basic-concept)
- [React Components](#react-components)
  - [Stateless Functional Components](#stateless-functional-components)
  - [Handling Events](#handling-events)
  - [Conditional Rendering](#conditional-rendering)
  - [controlled components vs uncontrolled components](#controlled-components-vs-uncontrolled-components)
  - [Lifting State up- sharing data betweent components](#lifting-state-up--sharing-data-betweent-components)
  - [Compositions vs Inheritance](#compositions-vs-inheritance)
- [Using a Third-Party Component](#using-a-third-party-component)
  - [Refactoring Other Stateless Functional Components](#refactoring-other-stateless-functional-components)
  - [Usint react-modal](#usint-react-modal)
- [React-Router](#react-router)
- [React Debug Tools](#react-debug-tools)

## Environment setup

- [Babel setup for react](https://babeljs.io/docs/en/babel-preset-react)
- Methods
  - Via CLI: `npm install --save-dev @babel/preset-react`
  - via `.babelrc`:

`babel src/app.js --out-file=public//scripts/app.js --presets=env,react`

## Basic concept

- [React SyntheticEvent](https://reactjs.org/docs/events.html)

## React Components

- basic structure
  - render method will be called each time an update happens
- events & methods & binding
- component props
  - All React components must act like pure functions with respect to their props
  - default props value
- component state
  - State allows React components to change their output over time in response to user actions, network responses, and anything else

```
                      Props          |       State
                           An object | An object
          Can be used when rendering | Can be used when rendering
Changes(from above) cause re-renders | Changes cause re-renders
                    Comes from above | Defined in component itself
Can't be changed by component itself | Can be changed by component itself
```

```javascript
//default props value sample
<Header subTitle={subTitle} />
// stateless functional component
const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            {props.subTitle && <h2>{props.subTitle}</h2>}
        </div>
    );
}
Header.defaultProps = {
    title: 'Indecision'
}
```

[back to top](#top)

### Stateless Functional Components

```javascript
const User = (props) => {
    return (
        <div>
            <p>Name: {props.name}</p>
            <p>Age: {props.age}</p>
        </div>
    )
}
ReactDOM.render(<User name="Andrew" age={26} />, document.getElementById('app'));
```

[back to top](#top)

### Handling Events

- by using arrow function
- by using Function.prototype.bind

```html
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

[back to top](#top)

### Conditional Rendering

**Method 1: no event handling**

```javascript
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}
function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}
ReactDOM.render(
  <Greeting isLoggedIn={false} />,
  document.getElementById('root')
);
```

**Method 2: with different event handling**

```javascript
function LoginButton(props) {
  return (
    <button onClick={props.onClick}>Login</button>
  );
}
function LogoutButton(props) {
  return (
    <button onClick={props.onClick}> Logout </button>
  );
}
class LoginControl extends React.Component {
    //...
    handleLoginClick() {
        this.setState({isLoggedIn: true});
    }
    handleLogoutClick() {
        this.setState({isLoggedIn: false});
    }
    render() {
        //...
        if (isLoggedIn) {
            button = <LogoutButton onClick={this.handleLogoutClick} />;
        } else {
            button = <LoginButton onClick={this.handleLoginClick} />;
        }
        //...
    }
}
```

**Method 3: Inline If with Logical && Operator**

`{unreadMessages.length > 0 && <h2> You have {unreadMessages.length} unread messages. </h2> }`

### controlled components vs uncontrolled components

- Controlled components: form data is handled by a React component
  - form elements such as `<input>`, `<textarea>`, and `<select>` typically maintain their own state and update it based on user input
  - In React, mutable state is typically kept in the state property of components, and **only updated** with `setState()`
  - An input form element whose **value** is controlled by React in this way is called a “controlled component”
  - `<input type="checkbox">` and `<input type="radio">` support `defaultChecked`, and `<input type="text">`, `<select>` and `<textarea>` supports `defaultValue`.
- Uncontrolled components: form data is handled by the DOM itself
  - use `ref` to the DOM node to access file(s) in a submit handler, refer to [Refs and the DOM](https://reactjs.org/docs/refs-and-the-dom.html)
  - Note: `<input type="file" />` is uncontrolled component in React

```javascript
//Controlled components
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label> Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
//Uncontrolled components
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = React.createRef();   //use ref
  }
  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.current.value);
    event.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Name:
          <input type="text" ref={this.input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

[back to top](#top)

### Lifting State up- sharing data betweent components

- lift states up to their **closest common ancestor**
  - more codes than 'two-way binding' approache
  - but it takes less work to find and isolate bugs,
  - can implement any custom logic to rject or transform user input

```javascript
//parent component
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }
  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }
  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }
  render() {
    // lift states to this parent component
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
    return (
      <div>
        <TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange} />
      </div>
    );
  }
}
//child component
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);  //call this.props.onTemperatureChange() with the new desired value
  }
  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature} onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```

[back to top](#top)

### Compositions vs Inheritance

- Some components don’t know their children ahead of time, such as Sidebar or Dialog
- use the special children prop to pass children elements directly into their output

```javascript
/* composition sample 1 */
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
// Anything inside the <FancyBorder> JSX tag gets passed into the FancyBorder component as a children prop.
// Since FancyBorder renders {props.children} inside a <div>, the passed elements appear in the final output
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title"> {props.title} </h1>
      <p className="Dialog-message"> {props.message} </p>
      {props.children}
    </FancyBorder>
  );
}
class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }
  render() {
    return (
      <Dialog title="Mars Exploration Program" message="How should we refer to you?">
        <input value={this.state.login} onChange={this.handleChange} />
        <button onClick={this.handleSignUp}> Sign Me Up! </button>
      </Dialog>
    );
  }
  handleChange(e) {
    this.setState({login: e.target.value});
  }
  handleSignUp() {
    alert(`Welcome aboard, ${this.state.login}!`);
  }
}
ReactDOM.render( <SignUpDialog />, document.getElementById('root'));
/* composition sample 2 */
function Contacts() {  //stateless component
  return <div className="Contacts" />;
}
function Chat() { //stateless component
  return <div className="Chat" />;
}
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left"> {props.left} </div>
      <div className="SplitPane-right"> {props.right} </div>
    </div>
  );
}
function App() {
  //pass component directly by using props, React elements like <Contacts /> and <Chat /> are just objects
  return (<SplitPane left={ <Contacts /> }
                     right={ <Chat /> } /> );
}
ReactDOM.render( <App />, document.getElementById('root'));

```

[back to top](#top)

## Using a Third-Party Component

### Refactoring Other Stateless Functional Components

```javascript
// solution 1
const Layout = (props) => {
    return (
        <div>
            <p>Header</p>
            {props.content}
            <p>footer</p>
        </div>
    )
};
const template = (
    <div>
        <p>Page Title</p>
        <p>This is my page</p>
    </div>
);
ReactDOM.render(<Layout content={template} />, document.getElementById('app'));
//solution 2
const Layout = (props) => {
    return (
        <div>
            <p>Header</p>
            {props.children}
            <p>footer</p>
        </div>
    )
};
ReactDOM.render((
    <Layout>
        <div>
            <p>Page Title</p>
            <p>This is my page</p>
        </div>
    </Layout>
), document.getElementById('app'));
```

### Usint react-modal

```javascript
<OptionModel selectedOption={this.state.selectedOption} handleClearSelectedOption={this.handleClearSelectedOption} />
```

[back to top](#top)

## React-Router

**React-Router + firebase + **

- https://budget-app.mead.io/
- https://github.com/andrewjmead/react-course-2-expensify-app

[back to top](#top)

## React Debug Tools

- remove constructor and bind , arrow function when using webpack plugin- transform-class-properties
- React Development Tools(Chrome extension)
- ![](https://i.imgur.com/lVjgQnx.png)

[back to top](#top)

> References
- [Project sample](http://indecision.mead.io/)
- [Project source code](https://github.com/andrewjmead/react-course-2-indecision-app)


```javascript
// there is only one default export
import substract, { square, add } from './util';
//default export
const square = (x) => x * x;
const add = (a, b) => a + b;
const substract = (a, b) => a - b;
export { square, add, substract as default};
// ------
export const square = (x) => x * x;
export const add = (a, b) => a + b;
const substract = (a, b) => a - b;
export default substract;
// ------
export const square = (x) => x * x;
export const add = (a, b) => a + b;
export default (a, b) => a - b;
```