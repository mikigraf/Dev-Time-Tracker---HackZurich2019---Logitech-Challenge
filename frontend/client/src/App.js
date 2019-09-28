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
      apps: [
        {
          name: "steam_osx",
        }
      ],
      log: [
        {
          duration: 2, // duration in minutes, values of 0.10 also possible, so round up
          start_time: Date.now(),
          end_time: Date.now(),
          type: "Software Development"
        }
      ]
    };
  }
  
  render(){
    return (
      
    <div>


      <div class="header">
      <img src="./logo_transparent.png" alt="logo" />
      <h1>DevTime</h1>
      </div>


      <div className="sidebar">
      
      </div>



      <div className="main">
        
      
      <div className= "input">
      <p>block app</p>
      <Input />
      </div>

      
      <div className= "timetable">
      <p>time spent</p>
      <TimeTable logs={this.state.log}/>
      </div>

      
      <div className= "blockedapptable">
       <p>blocked apps</p>
      <BlockedAppTable apps={this.state.apps}/>
      </div>
  
      </div></div>
  
    );
  }
  
}

export default App;
