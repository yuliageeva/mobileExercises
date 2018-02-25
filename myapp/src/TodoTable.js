import React, { Component } from 'react';
import './App.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

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
        <ReactTable data={this.props.todos}
                    columns={columns} sortable={true}
                    defaultPageSize={10} />
        // <div className ="App">
        //  <table>
        //     <tbody>
        //         <tr>
        //         <th>Date</th>
        //         <th>Description</th>
        //         <th>Action</th>
        //         </tr>
        //         {this.props.todos.map((item,index) => 
        //             <tr key={index}>
        //                 <td>{item.date}</td>
        //                 <td>{item.description}</td>
        //                 <td><button type ="button" onClick={(e)=> this.props.removeItem(item,index)}>Delete</button></td>
        //             </tr>
        //         )}

        //    </tbody>
        // </table>             
        // </div>  
    );  
}
}

export default TodoTable;