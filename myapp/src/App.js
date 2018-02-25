import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoTable from './TodoTable';

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
    const newToDo = {date:this.state.date, description: this.state.description};
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


  render() {
    // const {todos} = this.state;
    
    return (
      <div className="App">
        <div className="App-header">
          <h2>Simple Todolist</h2>
        </div>

        <div>
          <form onSubmit={this.addTodo}>
            Date: <input type="date" name="date" onChange={this.inputChanged} value={this.state.date}/>
            Description: <input type="text" name="description" onChange={this.inputChanged} value={this.state.description}/>
            <input type="submit" value="Add"/>
          </form>
        </div>

        <div>
        <table>
        <tbody>
        <TodoTable 
        removeItem={this.removeItem.bind(this)}
        todos={this.state.todos} />
        </tbody>
        </table>
        </div>
     
       
      </div>

           
 
    );
  }
}

export default App;
