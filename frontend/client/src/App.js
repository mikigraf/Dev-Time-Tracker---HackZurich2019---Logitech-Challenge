import React from 'react';
import './App.css';
import 'element-theme-default';
import {Component} from 'react';
import Input from './Input';
import TimeTable from './TimeTable';
import BlockedAppTable from './BlockedAppTable';

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
      // {/* <div class="sidebar">
      // <a href="#abc"> a </a>
      // <a href="#def"> b </a>
      // <a href="#ghi"> c </a>
      // <a href="#jkl"> d </a>
      // </div> */}
  
      <div className="main">
        <p>bla bla bla </p>
        <p>miau miau </p>
      
      <Input value='ich liebe dich' />
      <TimeTable logs={this.state.log}/>
      <BlockedAppTable apps={this.state.apps}/>
  
      </div>
  
    );
  }
  
}

export default App;
// render: function(data)
//    {
//        return (
//            <span>
//                <span style={{marginLeft: '10px'}}>{data.time}</span>
//            </span>
//        )
//    }