// const obj = {
//     name: 'Vikram',
//     getName() {
//         return this.name;
//     }
// }

// // const getName = obj.getName;
// // console.log(getName());    //error
// const getName = obj.getName.bind({name: 'Andrew'});
// console.log(getName());

//class-based components
class IndecisionApp extends React.Component {
    constructor(props){
        super(props);
        this.handleDeletOptions = this.handleDeletOptions.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.state = {
            options: props.options
        }
    }

    componentDidMount(){
        console.log('Indecision componentDidMount, fetching data');
        try {
            const options = JSON.parse(localStorage.getItem('options'));
            if(options) {
                this.setState({ options: options});
            }
        } catch(e){
            // Do nothing at all if there is error of JSON.parse
        }

    }
    componentDidUpdate(prevProps, prevState){
        console.log('Indecision componentDidUpdate! Saving data');
        console.log('Indecision componentDidUpdate: Props: ', prevProps );
        console.log('Indecision componentDidUpdate: State: ', prevState );
        if(prevProps.options.length !== prevState.options.length){
            localStorage.setItem('options', JSON.stringify(this.state.options));
        }
    }
    componentWillUnmount(){
        console.log('Indecision componentWillUnmount!');
    }
    // ReactDOM.render(React.createElement('p'), document.getElementById('app'));  in console

    handleDeletOptions(){
        this.setState(() => {
            return { options: [] };
        });
    }
    handleDeleteOption(optionToRemove){
        this.setState((prevState) => {
            return { options: prevState.options.filter((option) => optionToRemove !== option)  }
        });
    }
    handleAddOption(option){
        if(!option) {
            return 'Enter valid value to add item';
        } else if(this.state.options.indexOf(option) > -1) {
            return 'This option already exists';
        }
        this.setState((prevState) => ({
            options:  prevState.options.concat(option)
        }))
    }
    handlePick(){
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        alert(option);
    }
    render() {
        const title = 'Indecision';
        const subTitle = 'Put your life in the hands of a computer.';
        return (
            <div>
                {/* <Header title={title} subTitle={subTitle} /> */}
                <Header subTitle={subTitle} />
                <Action hasOptions={this.state.options.length > 0} handlePick={this.handlePick} />
                <Options
                    options={this.state.options}
                    handleDeletOptions={this.handleDeletOptions}
                    handleDeleteOption={this.handleDeleteOption} />
                <AddOption handleAddOption={this.handleAddOption} />
            </div>
        );
    }

}
IndecisionApp.defaultProps = {
    options: []
}

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
// define component by class
// class Header extends React.Component {
//     render() {
//         return (
//             <div>
//                 <h1>{this.props.title}</h1>
//                 <h2>{this.props.subTitle}</h2>
//             </div>
//         );
//     }
// }

// define component by function
// function Header(props) {
//     return <p>This is from Header.</p>;
// }

//Stateless Functional Component
const Action = (props) => {
    return (
        <div>
            <button onClick={props.handlePick} disabled={!props.hasOptions}>What should I do?</button>
        </div>
    );
}
//class-based component
// class Action extends React.Component {
//     constructor(props){
//         super(props);
//     }
//     render() {
//         return (
//             <div>
//                 <button onClick={this.props.handlePick} disabled={!this.props.hasOptions}>What should I do?</button>
//             </div>
//         );
//     }
// }

const Options = (props) => {
    return (
        <div>
            <button onClick={props.handleDeletOptions}>Remove All</button>
            {props.options.length == 0 && <p>Please add an option to get started!</p>}
            { props.options.map((option, index) =>
                <Option key={option} optionText={option} handleDeleteOption={props.handleDeleteOption} />
            )}
        </div>
    );
}

// class Options extends React.Component {
//     render() {
//         return (
//             <div>
//                 <button onClick={this.props.handleDeletOptions}>Remove All</button>
//                 { this.props.options.map(option => <Option key={option} optionText={option} />)}
//             </div>
//         );
//     }
// }

const Option = (props) => {
    return (
        <li>
            {props.optionText}
            <button onClick={(e) => {props.handleDeleteOption(props.optionText);}}>
                Remove
            </button>
        </li>
    );
}

// class Option extends React.Component {
//     render() {
//         return (
//             <li>
//                 {this.props.optionText}
//             </li>
//         );
//     }
// }

class AddOption extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            error: undefined
        }
        this.handleAddOption = this.handleAddOption.bind(this);
    }
    handleAddOption(e) {
        e.preventDefault();
        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);
        this.setState(() => { return { error } });
        if(!error) {
            e.target.elements.option.value = '';
        }
    }
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option" />
                    <button>Add Option</button>
                </form>
            </div>
        );
    }
}

//Stateless Functional Components
// const User = (props) => {
//     return (
//         <div>
//             <p>Name: {props.name}</p>
//             <p>Age: {props.age}</p>
//         </div>
//     )
// }

// ReactDOM.render(
//     <User name="Andrew" age={26} />,
//     document.getElementById('app')
// );

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
//ReactDOM.render(<IndecisionApp options={['1','2']} />, document.getElementById('app'))