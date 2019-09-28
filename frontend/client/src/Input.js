import React from 'react';
import './App.css';
import 'element-theme-default';

class Input extends React.Component {
    constructor(props) {
      super(props);
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(props){
        this.setState({value: this.props.value});
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert('Jo etwas passiert' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (<div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Input: 
            <input type="text" value={this.props.value} placeholder={this.props.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        </div>
      );
    }
  }
  
   
export default Input;