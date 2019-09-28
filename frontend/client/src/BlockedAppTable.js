import React from 'react';
import 'element-theme-default';
import './App.css';
import {Component} from 'element-react';
import {Button} from 'element-react';
import {Table} from 'element-react';



class BlockedAppTable extends React.Component
{
    constructor(props)
    {
        super(props);
        console.log(this.props.apps);
        this.state = {
            columns:[
                {
                    label: "App-Name",
                    prop: "name",
                    width: 450, 
                    render: function(data)
                    {
                        return <span>
                            <span style={{marginLeft: '10px'}}>{data.name}</span>
                             </span>
                    }
                },
                {
                   label:"Delete?",
                   width: 150,
                   render: function()
                   {
                    return(
                    <Button type="info" size="small">Delete</Button>
                    )
                   }
                }
            ],
            data:[
                
            ]
            }
        }

    componentDidMount(){
        this.setState({data: this.props.apps});
    }
    
    render()
   {
    return (
        <Table
          style={{width: '100%'}}
          columns={this.state.columns}
          data={this.state.data}
          border={true}
          highlightCurrentRow={true}
          onCurrentChange={item=>{console.log(item)}}
        />
      )
   }
}

export default BlockedAppTable;