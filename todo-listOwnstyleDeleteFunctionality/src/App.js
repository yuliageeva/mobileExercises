import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoTable from './TodoTable';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  } from 'material-ui/Table';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {description: '', date: '', todos: []}
  }

  inputChanged = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  addTodo = (event) => {
    console.log("called addTodo");
    event.preventDefault();
    const strDate = this.state.date.getDate() + "." + (this.state.date.getMonth()+1) + "." + this.state.date.getFullYear();
    const newToDo = {date:strDate, description: this.state.description};
    this.setState({
      todos: [...this.state.todos, newToDo]
    });
  }

  removeItem(item,index) {
    const newToDo = this.state.todos.filter((todo, i) => i !== index
  );
    this.setState({
      todos: [...newToDo]
    })

  }
  dateChanged = (event,date) => {
    this.setState({date:date});
  }


  render() {
    // const {todos} = this.state;
    
    return (
      <div className="App">
        <div className="App-header">
          <h2>Simple Todolist</h2>
        </div>

        <div>
          {/* <form onSubmit={this.addTodo}> */}
            Date: <DatePicker name="date" hintText="Type the date" onChange={this.dateChanged} value={this.state.date}/>
            Description: <TextField name="description" hintText="Type the description" onChange={this.inputChanged} value={this.state.description}/>
            <RaisedButton primary={true} label = "Add" onClick={this.addTodo}/>
          {/* </form> */}
        </div>

        {/* <div>
        
        <TodoTable 
        removeItem={this.removeItem.bind(this)}
        todos={this.state.todos} />
        
        </div> */}
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableHeaderColumn>Date</TableHeaderColumn>
          <TableHeaderColumn>Description</TableHeaderColumn>
          </TableHeader>
          <TableBody>
          {this.state.todos.map((item, index) =>
          <TableRow key={index}><TableRowColumn>{item.date}</TableRowColumn>
          <TableRowColumn>{item.description}</TableRowColumn></TableRow>)}
          </TableBody>
          </Table>
       
      </div>

           
 
    );
  }
}

export default App;

