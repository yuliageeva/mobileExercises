import React, { Component } from 'react';
import './App.css';


class TodoTable extends Component {
    constructor(props) {
        super(props);
      }



render(){
    const columns = [{
        Header: 'Date',
        accessor: 'date' 
        }, {
        Header: 'Description',
        accessor: 'description',
        }]
    return (
        
        <div className ="App">
         <table class="toDo">
            <tbody>
                <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Action</th>
                </tr>
                {this.props.todos.map((item,index) => 
                    <tr key={index}>
                        <td class="formatting">{item.date}</td>
                        <td class="formatting">{item.description}</td>
                        <td class="formatting"><button type ="button" onClick={(e)=> this.props.removeItem(item,index)}>Delete</button></td>
                    </tr>
                )}

           </tbody>
        </table>             
        </div>  
    );  
}
}

export default TodoTable;