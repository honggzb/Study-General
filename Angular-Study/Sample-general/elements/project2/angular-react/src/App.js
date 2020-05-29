import React, {Component} from 'react';
import './App.css';

class App extends Component {

  render(){
    return (
      <div className="App">
        <hello-world
          title="Batman"
          rname="Bruce Wayne"
          occupation="World's Greatest Detective"
          location="Gotham"
          first="Detective Comics #27"
          ref={this.handleClick}></hello-world>
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
    //console.log(this.component);
    this.component.addEventListener('display', this.showInfo);
  }
  componentWillUnmount() {
    this.component.removeEventListener('display', this.showInfo);
  }

}

export default App;
