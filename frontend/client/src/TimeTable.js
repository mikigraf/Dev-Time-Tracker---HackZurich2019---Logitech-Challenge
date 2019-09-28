import React from 'react';
import 'element-theme-default';
import './App.css';
import {Component} from 'react';
import {Button} from 'element-react';
import {Table} from 'element-react';
import {Tag} from 'element-react';


class TimeTable extends React.Component
{
   constructor(props)
   {
       super(props);
       console.log(this.props.logs);
       this.state = {
           columns: [
               {
                   label:"Duration (Minutes)",
                   prop:"duration",
                   width: 150,
                //    render: function(data)
                //    {
                //        return (
                //            <span>
                //                <span style={{marginLeft: '10px'}}>{data.time}</span>
                //            </span>
                //        )
                //    }
               },
               
               {
                   label:"Start",
                   prop:"start_time",
                   width: 150,
                //    render:function(data)
                //    {
                //        return (
                //            <span>
                //                 <span style={{marginLeft: '10px'}}>{data.time}</span>
                //            </span>
                //        )

                //    }
               },
               {
                    label:"End",
                    prop:"end_time",
                    width: 150,
                    // render:function(data)
                    // {
                    //     return(
                    //         <span>
                    //             <span style={{marginLeft: '10px'}}>{data.time}</span>
                    //        </span>
                    //     )
                    // }
               },
               {
                label: "Type",
                 prop:"type",
                width: 150,
                // render: function(data)
                // {
                          // render: function(data)
                // {
                //     return(
                //  <span>
                //  <span style={{marginLeft: '10px'}}>{data.type}</span>
                //   </span>
                //     )
                // }      //     return(
                //  <span>
                //  <span style={{marginLeft: '10px'}}>{data.type}</span>
                //   </span>
                //     )
                // }
               },
               {
                   label:"Delete?",
                   width: 150,
                   render: function()
                   {
                    return(
                    <Button type="danger" size="small">Delete</Button>
                    )
                   }
               }
           ],
           data:[
            //    {
            //     date: '2016-05-03',
            //     name:'Hermanek',
            //     start: '0',
            //     end:'0'
            //    },
            //    {
            //     date: '2016-05-03',
            //     name:'Luetti',
            //     start: '0',
            //     end:'0'
            //    }







           ]
       }

   }

     componentWillMount(){
        let currentData = this.state.data;
        this.props.logs.forEach(entry => {
            let temp = {
                date: Date.now(),
                type: entry.type,
                start_time: entry.start_time,
                end_time: entry.end_time,
                duration: entry.duration
            }
            currentData.push(temp);
            
        });
        this.setState({data: currentData});
        console.log(currentData);
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




export default TimeTable;