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
  - [Test Non-state components with parameters](#test-non-state-components-with-parameters)
- [React Debug Tools](#react-debug-tools)

## Environment setup

- [Babel setup for react](https://babeljs.io/docs/en/babel-preset-react)
- Methods
  - Via CLI: `npm install --save-dev @babel/preset-react`
  - via `.babelrc`
 - package.json, .babelrc, jest.config.js, jest.config.json, webpack.config.js

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

### Test Non-state components with parameters

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

## React Debug Tools

- remove constructor and bind , arrow function when using webpack plugin- transform-class-properties
- React Development Tools(Chrome extension)
- ![](https://i.imgur.com/lVjgQnx.png)

[back to top](#top)

> References && resources
- [Project sample](http://indecision.mead.io/)
- [Project source code](https://github.com/andrewjmead/react-course-2-indecision-app)
- https://airbnb.io/react-dates
- https://momentjs.com/
- https://regex101.com/
- [enzyme](https://airbnb.io/enzyme/)
- [Jest test samples](https://github.com/facebook/jest/tree/master/examples)
