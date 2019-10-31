//JSX - Javascript XML

// let visiblility = false;

// const toggleVisibility = () => {
//     visiblility = !visiblility;
//     render();
// };

// var appRoot = document.getElementById('app');
// const render = () => {
//     const template = (
//         <div>
//             <h1>Visiblity Toggle</h1>
//             <button onClick={toggleVisibility}>
//                 {visiblility ? 'Hide Details' : 'Show details'}
//             </button>
//             { visiblility && (<div><p>Hey. These are some details you can now see!</p></div>) }
//         </div>);
//     ReactDOM.render(template, appRoot);
// }

// render();

// class sample

class ToggleVisible extends React.Component {
    constructor(props){
        super(props);
        this.toggleV = this.toggleV.bind(this);
        this.state = {
            visiblility: false
        }
    }
    toggleV() {
        this.setState((prevState) => {
            return {visiblility : !prevState.visiblility }
        })
    }
    render() {
        return (
            <div>
                <h1>Visiblity Toggle</h1>
                <button onClick={this.toggleV}>
                 {this.state.visiblility ? 'Hide Details' : 'Show details'}
             </button>
             { this.state.visiblility && (<div><p>Hey. These are some details you can now see!</p></div>) }
            </div>
        );
    }
}

ReactDOM.render(<ToggleVisible />, document.getElementById('app'));