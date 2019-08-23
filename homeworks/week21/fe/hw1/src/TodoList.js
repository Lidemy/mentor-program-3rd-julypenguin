import React, { Component } from 'react';
import TodoInput from './TodoInput'
import './style.css';

class TodoList extends Component {
  state = {
    text: '',
    todos: [],
  }

  onChangeText = (e) => {
    this.setState({
      text: e.target.value
    })
  }

  handleSubmit = (e) => {
    const { text, todos } = this.state;
    e.preventDefault();
    this.setState({
      todos: [
        ...todos, {
          id: Date.now(),
          content: text,
          isDone: false,
        }
      ],
      text: '',
    })
  }

  handleDelete = (id) => {
    const { todos } = this.state;
    this.setState({
      todos: todos.filter(todo => todo.id !== id)
    })
  }

  handleDone = (id) => {
    const { todos } = this.state;
    this.setState({
      todos: todos.map((todo) => {

        if (todo.id !== id) return todo;

        return {
          ...todo,
          isDone: !todo.isDone
        }
      })
    })
  }

  render() {
    const { text, todos } = this.state;
    return (
      <div>
        <TodoInput text={text} handleSubmit={this.handleSubmit} onChangeText={this.onChangeText}/>
        <section className="contents">
          <div className="row">

              {todos.map(({ id, content, isDone }) => (
                <div className="col-12 margin" key={id}>
                  <div className={`card ${isDone ? 'done-bgc' : ''}`}>
                    <div className="card-body">
                      <span className="text-wrapper">
                        <input type="checkbox" className={`done ${isDone && 'checked'}`} onClick={() => this.handleDone(id)} />

                        <span className="card-text " data-id={id}>{content}</span>
                        <span className={`badge margin ${isDone ? 'badge-success' : 'badge-warning'}`}>{isDone ? '完成' : '未完成'}</span>
                      </span>
                      <a href="#" className="btn btn-danger delete" onClick={ () => this.handleDelete(id)}>刪除</a>
                    </div>
                  </div>
                </div>
              ))}

          </div>
        </section>
      </div>
    );
  }
}

export default TodoList;