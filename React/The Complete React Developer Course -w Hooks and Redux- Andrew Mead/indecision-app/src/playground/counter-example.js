// let count = 0;
// const addOne = () => {
//     count++;
//     renderCounterApp();
//     console.log('AddOne', count);
// }
// const minusOne = () => {
//     count--;
//     renderCounterApp();
//     console.log('minusOne', count);
// }
// const reset = () => {
//     count = 0;
//     renderCounterApp();
//     console.log('reset', count);
// }
// var appRoot = document.getElementById('app');
// const renderCounterApp = () => {
//     const template = (
//         <div>
//             <h1>Count: {count}</h1>
//             <button id="my-id" className="button" onClick={addOne}>+1</button>
//             <button id="my-id" className="button" onClick={minusOne}>-1</button>
//             <button id="my-id" className="button" onClick={reset}>reset</button>
//         </div>
//     );
//     ReactDOM.render(template, appRoot);
// }
// renderCounterApp();

// class Sample

class Counter extends React.Component {
    constructor(props){
        super(props);
        this.handleAddOne = this.handleAddOne.bind(this);
        this.handleMinusOne = this.handleMinusOne.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.state = {
            count: 0,
            name: 'Julie'
        };
    }
    handleAddOne(){
        this.setState((prevState) => {
            return {
                count: prevState.count + 1
            }
        });
        console.log('handleAddOne');
    }
    handleMinusOne(){
        this.setState((prevState) => {
            return {
                count: prevState.count - 1
            }
        });
        console.log('handleMinusOne');
    }
    handleReset(){
        // this.setState(() => {
        //     return {
        //         count: 0
        //     }
        // });
        // short writing
        this.setState({ count: 0 });
        // this.setState({
        //     count: this.state.count + 1 //notice: react is async, this return result is no correct
        // });
        // correct solution
        // this.setState((prevState) => {
        //     return {
        //         count: prevState.count + 1
        //     }
        // });
        console.log('reset');
    }
    render() {
        return (
            <div>
                {this.state.name}
                <h1>Count: {this.state.count}</h1>
                <button onClick={this.handleAddOne}>+1</button>
                <button onClick={this.handleMinusOne}>-1</button>
                <button onClick={this.handleReset}>reset</button>
            </div>
        );
    }
}

Counter.defaultProps = {
    count: 100
}

ReactDOM.render(<Counter count={-10} />, document.getElementById('app'));