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
                    columns={columns} sortable={true} filterable={true}
                    defaultPageSize={10} />
  
    );  
}
}

export default TodoTable;