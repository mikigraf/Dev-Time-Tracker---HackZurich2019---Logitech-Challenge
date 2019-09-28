import React from 'react';
import './App.css';
import 'element-theme-default';
import {Component} from 'react';
import Input from './Input';
import TimeTable from './TimeTable';
import BlockedAppTable from './BlockedAppTable';
import {Menu} from 'element-react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      apps: null,
      log: null
    };
  }

  componentDidMount() {
    fetch('/apps')
      .then(response => response.json())
      .then(data => this.setState({apps: data }));

    fetch('/logs')
      .then(response => response.json())
      .then(data => this.setState({ log: data }));

    console.log("StatE::: " + JSON.stringify(this.state));
  }
  
  render(){
    const { apps, log} = this.state; 
    return (
      
    <div>


      <div className="header">
      
      <h1>DevTime</h1>
      </div>


      <div className="sidebar">
      <img src="./logo_transparent.png" alt="logo" />
      </div>



      <div className="main">
        
      
      {/* <div className= "input">
      <p>block app</p>
      <Input />
      </div> */}

      
      { apps && log ? (
        <div>
        <div className= "timetable">
        <p>time spent</p>
        <TimeTable logs={log}/>
        </div>

        
        <div className= "blockedapptable">
        <p>blocked apps</p>
        <BlockedAppTable apps={apps}/>
        </div>
      </div>
      ) : <div>is loading</div>}
  
      </div></div>
  
    );
  }
  
}

export default App;
