[The Complete React Developer Course -w Hooks and Redux- Andrew Mead](#top)

- [Environment setup](#environment-setup)
- [Basic concept](#basic-concept)
- [React Components](#react-components)
  - [Stateless Functional Components](#stateless-functional-components)
  - [Handling Events](#handling-events)
  - [Conditional Rendering](#conditional-rendering)
  - [controlled components vs uncontrolled components](#controlled-components-vs-uncontrolled-components)
  - [Lifting State up- sharing data betweent components](#lifting-state-up--sharing-data-betweent-components)
  - [Higher order component(HOC)- renders another component](#higher-order-componenthoc--renders-another-component)
  - [Compositions vs Inheritance](#compositions-vs-inheritance)
- [Using a Third-Party Component](#using-a-third-party-component)
  - [Refactoring Other Stateless Functional Components](#refactoring-other-stateless-functional-components)
  - [Using react-modal](#using-react-modal)
- [React-Router](#react-router)
  - [BrowserRouter vs HashRouter](#browserrouter-vs-hashrouter)
- [React with Redux](#react-with-redux)
  - [Three Principles](#three-principles)
  - [Redux Basic concepts](#redux-basic-concepts)
    - [Stores- configuration](#stores--configuration)
    - [Reducers](#reducers)
    - [Selectors](#selectors)
    - [Actions](#actions)
- [Testing](#testing)
  - [Setup environment](#setup-environment)
  - [Test Redux](#test-redux)
  - [Test Dynamic components](#test-dynamic-components)
    - [Simple component - without 3rd libraries](#simple-component---without-3rd-libraries)
    - [complex components - with 3rd libraries](#complex-components---with-3rd-libraries)
  - [Test stateless function components with parameters](#test-stateless-function-components-with-parameters)
- [Combining with Firebase - Web app](#combining-with-firebase---web-app)
  - [setup Firebase and connect webApp](#setup-firebase-and-connect-webapp)
  - [Operating data](#operating-data)
  - [Listening data and stop Listening](#listening-data-and-stop-listening)
  - [Array data in Firebase](#array-data-in-firebase)
  - [Combing redux to Firebase](#combing-redux-to-firebase)
    - [Using in Codes](#using-in-codes)
    - [Unit test](#unit-test)
    - [set up seperate database for testing](#set-up-seperate-database-for-testing)
    - [Firebase rule setup](#firebase-rule-setup)
  - [Error issues Fix](#error-issues-fix)
- [React Debug Tools](#react-debug-tools)
- [Deploying application](#deploying-application)
  - [Production Webpack](#production-webpack)
  - [Creating Separate CSS Files](#creating-separate-css-files)
- [Dynamically add version number to application based on grunt](#dynamically-add-version-number-to-application-based-on-grunt)
  - [Method 1: grunt-string-replace](#method-1-grunt-string-replace)
  - [Method 2: grunt-string-replace](#method-2-grunt-string-replace)

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

### Higher order component(HOC)- renders another component

```javascript
const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
)
const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>This is private info. Please don't share.</p>}
            <WrappedComponent {...props}/>
        </div>
    )
};
const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuth ? (<WrappedComponent {...props}/>) : (<p>Please login to view the info.</p>)}
        </div>
    )
};
const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);
ReactDOM.render(<AdminInfo isAdmin={false} info="There are the details" />, document.getElementById('app'));
```

[back to top](#top)

### Compositions vs Inheritance

- Some components don’t know their children ahead of time, such as Sidebar or Dialog(generic “boxes”)
- use the special **children** prop to pass children elements directly into their output
- 还没有发现任何需要继承来实现的组件

![](https://i.imgur.com/g7erJyX.png)

```javascript
/* composition sample 1 */
// In FancyBorder -> children is Dialog
// In Dialog      -> children is input and button
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

### Using react-modal

```javascript
<OptionModel selectedOption={this.state.selectedOption} handleClearSelectedOption={this.handleClearSelectedOption} />
```

[back to top](#top)

## React-Router

**React-Router + firebase + **

- https://budget-app.mead.io/
- https://github.com/andrewjmead/react-course-2-expensify-app

### BrowserRouter vs HashRouter

```
BrowserRouter创建的URL形式                                |   HashRouter创建的URL形式
http://example.com/some/path                             | http://example.com/#/some/path
一般还需要对服务器进行配置，让服务器能正确地处理所有可能的URL | HashRouter则不存在这个问题，因为hash部分的内容会被服务器自动忽略
                                                         | 真正有效的信息是hash前端的部分，而对于单页应用来说，这部分是固定的
```

- BrowserRouter和HashRouter会创建一个history对象，history用来跟踪 URL, 当URL发生变化时， BrowserRouter和HashRouter的后代组件会重新渲染。React Router中提供的其他组件可以通过 context获取history对象，这也隐含说明了React Router中其他组件必须作为BrowserRouter和HashRouter组件后代使用。BrowserRouter和HashRouter中只能唯一的一个子元素。

## React with Redux

- https://redux.js.org/introduction/getting-started
- https://github.com/zalmoxisus/redux-devtools-extension

### Three Principles

**Redux can be described in three fundamental principles: **

- Single source of truth
- State is read-only
- Changes are made with pure functions

### Redux Basic concepts

- Actions
- Reducers
- Store
- Data Flow

```
├── src/
│   ├── actions/
│   │   ├── expenses.js
│   │   └── filters.jd
│   ├── components/
│   │   └── ...
│   ├── reducers/
│   │   ├── expenses.js
│   │   └── filters.js
│   ├── routers/
│   │   └── appRouter.js
│   ├── selectors/
│   │   └── expenses.js
│   ├── stores/
│   │   └── configureStore.js
│   └── app.js
```

#### Stores- configuration

```javascript
import {createStore, combineReducers} from 'redux';
export default () => {
    //store creation
    const store = createStore(
        combineReducers({                         //multiple reducers
            expenses: expensesReducer,
            filters: filtersReducer
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    return store;
}
```

#### Reducers

```javascript
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch(action.type){
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE':
            //console.log(state);
            return state.filter(({id}) => id !== action.id );
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if(expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    }
                }else{
                    return expense;
                }
            } );
        default:
            return state;
    }
};
export default expensesReducer;
```

#### Selectors

```javascript
// get visible expenses which already sorted
export default (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        // const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const createdAtMoment = moment(expense.createdAt);
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
        // const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if(sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if(sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
}
```

#### Actions

```javascript
// expense action
export const addExpense = (
       {description='', note='', amount=0, createdAt=0}={}
    ) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});
export const removeExpense = ({id}={}) => ({
    type: 'REMOVE_EXPENSE',
    id
});
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});
```

[back to top](#top)

## Testing

- Angular -> Karma, Jasmine
- React   -> [Jest](https://jestjs.io/)

### Setup environment

```javascript
npm install --save-dev "babel-core@^7.0.0-bridge.0"
//.babelrc
{
    "presets": [
      "@babel/preset-env",
      "@babel/preset-react",
      "@babel/preset-typescript"
    ],
    "plugins": [
      "@babel/plugin-transform-modules-commonjs",
      "@babel/plugin-transform-object-assign",
      "@babel/plugin-transform-runtime",
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-object-rest-spread",
      "@babel/plugin-transform-async-to-generator"
    ]
  }
//jest.config.js
'use strict';
module.exports = {
    transform: {
        '^.+\\.jsx$': 'babel-jest',
        '^.+\\.js$': 'babel-jest'
    }
};
//jest.config.json
{
    "setupFiles": [
        "raf/polyfill",
        "<rootDir>/tests/setupTests.js"
    ],
    "snapshotSerializers": [
        "enzyme-to-json/serializer"
    ]
}
//package.json
"test": "jest --config=jest.config.json -u --watchAll"
```

[back to top](#top)

### Test Redux

```javascript
// 1) mock up data- fixtures/expenses.js
export default [
    {
        id: '1',
        description: 'Gum',
        note: '',
        amount: 195,
        createdAt: 0
    },
    //...
]
// 2) test reducers
test('should remove expense by ID', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0],expenses[2]]);
});
// 3) test actions
test('should generate set start date action object', () => {
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    });
});
 // 4) test selectors
 test('should filter by text value', () => {
    const filters = {
        text: 'e',
        //...
    }
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[2],expenses[1]]);
});
```

[back to top](#top)

### Test Dynamic components

- `npm i --save-dev enzyme@3.0.0 enzyme-adapter-react-16 raf@3.3.2 enzy-to-json`
- will generate snapshot for each component test file - 'component/__snapshots__'
- Test Method
  - Simple component without 3rd-party libraries
    - ReactShallowRenderer in react-test-renderer
    - shallow in enzyme
  - complex components with 3rd-party libraries
    - `__mocks__/moment.js`-> mock up 3rd-party libraries
    - `simulate()`  -> events with no data
    - `prop()`      -> events with data
    - spy           -> user-defined events
- https://airbnb.io/enzyme/

#### Simple component - without 3rd libraries

```javascript
// 1) method 1- bying using react-test-renderer
import ReactShallowRenderer from 'react-test-renderer/shallow';
import Header from '../../src/components/Header';
//test static component
test('should render Header correctly', () => {
    const renderer = new ReactShallowRenderer();
    renderer.render(<Header />);
    expect(renderer.getRenderOutput()).toMatchSnapshot();
});
// 2) method 2- bying using enzyme
//need to set snapshotSerializers in jest.config.json
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Header from '../../src/components/Header';
test('should render Header correctly', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
    expect(toJSON(wrapper)).toMatchSnapshot();
    //expect(wrapper.find('h1').length).toBe(1);
    //expect(wrapper.find('h1').text()).toBe('Expensify');
});
```

[back to top](#top)

#### complex components - with 3rd libraries

```javascript
// 1) mock up third-party library-moment, __mocks__/moment.js
/* note: file path must be __mocks__ */
const moment = require.requireActual('moment');  //using requireActual
export default (timestamp = 0) => {
    return moment(timestamp);
};
// 2) basic test in ExpenseForm.test.js
test('should render ExpenseForm with expense data correctly', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[1]} />);
    expect(wrapper).toMatchSnapshot();
});
// 3) test user interaction -system events
//    submit, change, focus, ...- using simulate
// 3.1) if there is no data , using simulate()
test('should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }   // for ignore 'e.preventDefault();' in ExpenseForm.js
    });
    expect(wrapper.state('errorMessage').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});
// 3.2) if there is data, using spies for mock function
// 3.2.1) Simple spy
test('should call onSumbit prop for valid form submission', () => {
    const onSumbitSpy = jest.fn();   //for mock function
    onSumbitSpy('AB', 'CD');
    expect(onSumbitSpy).toHaveBeenCalled();
    expect(onSumbitSpy).toHaveBeenCalledWith('AB', 'CD');
});
// 3.2.2) complex spy
test('should call onSumbit prop for valid form submission', () => {
    const onSumbitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm
        expense={expenses[0]}
        onSubmit={onSumbitSpy} />);
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
    });
    expect(wrapper.state('errorMessage')).toBe('');
    // expenses[0] includes 'id', it is not equal to form values exactly
    expect(onSumbitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt
    });
});
// 3.3) test user-defined or 3rd library tag's event- by using prop() - https://airbnb.io/enzyme/docs/api/ReactWrapper/props.html
test('should set new date on date change', () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
});
```

[back to top](#top)

### Test stateless function components with parameters

- refactor Non-state component to class based component
  - add function insteads of inline codes
- setup mapDispatchToProps, needd change dispatch to props for testing
- [Setup without Create React App](https://jestjs.io/docs/en/tutorial-react)

```javascript
//expenseListFilters.js vs expenseListFilters.beforeTest
export class ExpenseListFilters extends React.Component {
  onTextChange = (e) => {
        this.props.setTextFilter(e.target.value);
    }
    onSortChange = (e) => {
        if(e.target.value === 'date') { this.props.sortByDate() }
        else { this.props.sortByAmount();  }
  }
  render() {
        return (
            <div>
                <input type="text" value={this.props.filters.text} onChange={this.onTextChange} />
                <select value={this.props.filters.sortBy} onChange={this.onSortChange}>
                    <!-  ... -->
                </select>
                <!-  ... -->
            </div>
        )
  }
}
const mapStateToProps = (state) => {
    return {
       filters: state.filters
    }
};
const mapDispatchToProps = (dispatch, props) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortByDate: () => dispatch(sortByDate()),
    sortByAmount: () => dispatch(sortByAmount()),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate))
});
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
// expenseListFilters.test.js
let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;
beforeEach(() => {               // common mock functions and snapshot
    setTextFilter = jest.fn();  //for mock function
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(
        <ExpenseListFilters filters={filters} setTextFilter={setTextFilter} sortByDate={sortByDate} sortByAmount={sortByAmount} setStartDate={setStartDate} setEndDate={setEndDate} />);
});
test('should handle filter text change on ExpenseListFilters Page correctly', () => {
    const value = 'bills';
    wrapper.find('input').simulate('change', {
        target: { value }
    });
    expect(setTextFilter).toHaveBeenLastCalledWith(value);
});
```

[back to top](#top)

## Combining with Firebase - Web app

### setup Firebase and connect webApp

1. Add Project
2. Add App to project, ![](https://i.imgur.com/8nEHfVR.png)
3. From menu, right-click 'setting', ![](https://i.imgur.com/5aSVJQk.png)
4. Rolling down and location to Your apps tab. Copying SDK snippet

![](https://i.imgur.com/e4SyRNt.png)

```javascript
// src/firebase/firebase.js
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database";
import * as expensesActions from '../actions/expenses';

var firebaseConfig = {
    apiKey: "...",
    authDomain: "...",
    databaseURL: "...",
    projectId: "...",
    storageBucket: "...",
    messagingSenderId: "...",
    appId: "...",
  };

firebase.initializeApp(firebaseConfig);
```

### Operating data

```javascript
//
const database = firebase.database();
//write data
database.ref().set({
    name: 'Andrew Mead',
    age: 26,
    isSingle: false,
    location: {
        city: 'city',
        country: 'abc'
    }
}).then(() => {
    console.log('Synchronization data is saved.');
}).catch((e) => {
    console.log('Synchronization failed.', e);
});
//update data
// method 1: using ref
database.ref('age').set(27);
database.ref('location/city').set('New York');
// method 2: using update, note: parameter is object
database.ref().update({
    name: 'Mike',
    age: 29,
    job: 'software developer'
});
// remove all data
database.ref()
    .remove()
    .then(() => {
        console.log('Synchronization data was removed');
    }).catch((e) => {
        console.log('Second synchronization failed.', e);
    });
```

### Listening data and stop Listening

```javascript
// Listen for data changes
const onValueChange =  (snapshot) => {
    console.log(snapshot.val());
};
// start listen
database.ref().on('value', onValueChange, (e) => {
    console.log('Error with data fetching', e);
})
setTimeout(() => {
    database.ref('age').set(30);
}, 3000);
//stop listen
setTimeout(() => {
    database.ref().off('value', onValueChange);
}, 5000);
setTimeout(() => {
    database.ref('age').set(60);
}, 8000);
```

[back to top](#top)

### Array data in Firebase

- Firebase just handle object, the struction is
- ![](https://i.imgur.com/3UqtRil.png)
- using `dataSnapshot` to handle array data in Firebase
- https://firebase.google.com/docs/reference/js/firebase.database.DataSnapshot

```javascript
// read from firebase and add to array
database.ref('expenses')
    .once('value')
    .then((snapshot) => {
        const expenses = [];
        snapshot.forEach((childSnapshot) => {
            expenses.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            })
        });
    });
// child remove
database.ref('expenses').on('child_removed', (snapshot) => {
    console.log(snapshot.key, snapshot.val());
});
// child changed
database.ref('expenses').on('child_changed', (snapshot) => {
    console.log(snapshot.key, snapshot.val());
});
// child added
database.ref('expenses').on('child_added', (snapshot) => {
    console.log(snapshot.key, snapshot.val());
});
```

[back to top](#top)

### Combing redux to Firebase

- just need modify action
- using [redux-thunk](https://www.npmjs.com/package/redux-thunk) middleware,
  - Redux Thunk middleware allows you to write action creators that return a function instead of an action
  - dispatching async actions

```
     before firebase                 |  after firebase
-------------------------------------|-------------------------------------
 component calls action generator    | Same
 action generator returns object     | action generator returns function
 component dispatches object         | component dispatches function(?)
 redux store changes                 | function runs(has the ability to dispatch other actions and do whatever it wants)
```

#### Using in Codes

```javascript
//1) configuration - src/stores/configureStore.js
import thunk from 'redux-thunk';
const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;
export default () => {
    //store creation
    const store = createStore(
        combineReducers({  //multiple reducers
            expenses: expensesReducer,
            filters: filtersReducer
        }),
        composeEnhances(applyMiddleware(thunk))
    );
    return store;
}
//2) using in action file, src/actions/expenses.js
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});
//add a new function to operate DB and handle dispatch at mean time
export const startAddExpense = (expenseData ={}) => {
    return (dispatch) => {
        const {description='', note='', amount=0, createdAt=0} = expenseData;
        const expense = { description, note, amount, createdAt };
        database.ref('expenses').push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        })
    }
}
//3) using startAddExpense in component(src/components/addExpenses.js)
```

#### Async Auth???- todo

- [Creating promise actions in redux](http://ramblings.mcpher.com/Home/excelquirks/reactredux/promiseactioncreator)
- [Firebase authentication with react and redux](http://ramblings.mcpher.com/Home/excelquirks/reactredux/firebaseauth)
- [React Redux Firebase - onAuthStateChanged delay prevents from using life cycle methods](https://stackoverflow.com/questions/51312765/react-redux-firebase-onauthstatechanged-delay-prevents-from-using-life-cycle-m)
- https://github.com/clairechabas/firebase-auth-react-redux

[back to top](#top)

#### Unit test

- using [redux-mock-store](https://github.com/dmitry-zaets/redux-mock-store) to mockup store for testing Redux async action creators and middleware
- using new function as mentioned above

```javascript
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const createMockStore = configureStore(middlewares);
test('should add expense to database and store', (done) => {   //use params done
    const store = createMockStore({});
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'This is test for store',
        createdAt: 1000
    }
    store.dispatch(startAddExpense(expenseData)).then(() => {
        //expect(1).toBe(1);
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });
        return database.ref(`expenses/${actions[0].expense.id}`).once('value').then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseData);
             // actual execute dispatch, otherwise it will never happen
            done();
        });
    });
});
```

[back to top](#top)

#### set up seperate database for testing

- [cross-env](https://www.npmjs.com/package/cross-env): using the environment variable properly for different platform
- [dotenv](https://www.npmjs.com/package/dotenv): loads environment variables from a .env file into process.env
- create two files under root path: '.env.test' and '.env.development`
- modify `package.json`, `webpack.config.js` and 'firebase/firebase.js`

```javascript
// 1) package.json - add 'cross-env NODE_ENV=test' in test command
"test": "cross-env NODE_ENV=test jest --config=jest.config.json -u --watchAll --colors",
// 2) create .env.test and .env.development file
FIREBASE_API_KEY=...
FIREBASE_AUTH_DOMAIN=...
FIREBASE_DATABASE_URL=...
FIREBASE_PROJECT_ID=...
FIREBASE_STORAGE_BUCKET=...
FIREBASE_MESSAGING_SENDER_ID=...
FIREBASE_APP_ID=...
// 3) webpack.config.js
const webpack = require('webpack');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';  // define key for using cross-env
 // load different .env file according to different key(environment)
if(process.env.NODE_ENV === 'test'){
    require('dotenv').config({path: '.env.test' });
} else if(process.env.NODE_ENV === 'development') {
    require('dotenv').config({path: '.env.development' });
}
// ...
plugins: [
  new webpack.DefinePlugin({
      'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
      'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
      'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
      'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
      'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
      'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
      'process.env.FIREBASE_APP_ID': JSON.stringify(process.env.FIREBASE_APP_ID)
    })
  ],
// 4) src/firebase/firebase.js
var firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};
```

- create mock test dummy data in test file,such as 'tests/actions/expenses.test.js'

```javascript
beforeEach((done) => {
    const expenseData = {};
    expenses.forEach(({id, description, note, amount, createdAt}) => {
        expenseData[id] = {description, note, amount, createdAt};  // change expenses format to Firebase format
    })
    database.ref('expenses').set(expenseData).then(() => done());
})
```

[back to top](#top)

#### Firebase rule setup

- ![](https://i.imgur.com/55hqqUB.png)
- https://firebase.google.com/docs/reference/security/database

```javascript
//location is '/users/fb69ecde-8e81-4e34-a339-12606f7d79c9/expenses/abc123'
{
  "rules": {
    ".read": false,
    ".write": false,
    "users": {
        "$user_id": {
          ".read":"$user_id === auth.uid",
          ".write":"$user_id === auth.uid",
          "expenses" : {
            "$expense_id": {
              	".validate": "newData.hasChildren(['description', 'note', 'createdAt', 'amount'])",
                "description": {
                 	".validate": "newData.isString() && newData.val().length > 0"
                },
                "note": {
                   ".validate": "newData.isString()"
                },
                "createdAt": {
                  ".validate": "newData.isNumber()"
                },
                "amount": {
                  ".validate": "newData.isNumber()"
                },
                "$other": {
                  ".validate": false
                }
            }
          },
          // 除了expenses，其他的不能访问
          "$other": {
            ".validate": false
          }
        }
      }
  }
}
```

[back to top](#top)

### Error issues Fix

1. switch to Realtime Database
2. change rules to

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

3. disable some plugin if chrome did not show data

- [Firebase console](https://console.firebase.google.com/)
- [Firebase JavaScript SDK Reference](https://firebase.google.com/docs/reference/js)

[back to top](#top)

## React Debug Tools

- remove constructor and bind , arrow function when using webpack plugin- transform-class-properties
- React Development Tools(Chrome extension)
- ![](https://i.imgur.com/lVjgQnx.png)

[back to top](#top)

## Deploying application

### Production Webpack

- `webpack -p` in package.json
- output function insteads of output object - https://webpack.js.org/configuration/configuration-types/

### Creating Separate CSS Files

- [extract-text-webpack-plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin) for webpack<=3
- [mini-css-extract-pluginnpm ](https://github.com/webpack-contrib/mini-css-extract-plugin)

```javascript
//webpack.config.js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
plugins: [
    new MiniCssExtractPlugin({
          filename: '[name].css',
          chunkFilename: '[id].css',
          ignoreOrder: false,
        }),
    ],
module: {
    rules: [{
                test: /\.s?css$/,
                use: [{ loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',  // by default it uses publicPath in webpackOptions.output
                            hmr: process.env.NODE_ENV === 'dev',
                        },
                      },
                      'css-loader', 'sass-loader'
                    ]
            }]
},
```

[back to top](#top)

> References && resources
- [Project sample](http://indecision.mead.io/)
- [Project source code 1](https://github.com/andrewjmead/react-course-2-indecision-app)
- [Project source code 2](https://github.com/andrewjmead/react-course-2-expensify-app)
- https://airbnb.io/react-dates
- https://momentjs.com/
- https://regex101.com/
- [enzyme](https://airbnb.io/enzyme/)
- [Jest test samples](https://github.com/facebook/jest/tree/master/examples)


?????????????????

https://stackoverflow.com/questions/51312765/react-redux-firebase-onauthstatechanged-delay-prevents-from-using-life-cycle-m
