import React, { Component } from 'react'
import * as api from './todo.service'

export class Todo extends Component {
    constructor(props) {
        super(props)
    }


    changeStatus(id, isChecked) {
        return this.updateTodo({
            id,
            isChecked
        })
    }

    updateTextLabel(id, value) {
        return this.updateTodo({
            id,
            value
        })
    }

    removeTodo(todoId) {
        return api.removeTodo(todoId)
            .then(this.props.fetchTodos)
    }

    addTodo(todoText) {
        return api.addTodo({ value: todoText })
            .then(this.props.fetchTodos)
    }

    updateTodo(todo) {
        return api.updateTodo(todo)
            .then(this.props.fetchTodos)
    }

    render() {
        const { todos } = this.props
        const allTodos = todos.length
        const doneTodos = todos.filter(todo => todo.isChecked).length
        const undoneTodos = allTodos - doneTodos
        return (
            <div id="todo-app">
                <p>General count of todos - <span>{allTodos}</span></p>
                <p>Count of done - <span>{doneTodos}</span></p>
                <p>Count of undone - <span>{undoneTodos}</span></p>
                <form onSubmit={() => this.addTodo()}>
                    <input type="text" placeholder="Enter name new todo" />
                    <input type="submit" value="Add todo" />
                </form>
                <ul className="todo-list">
                    {todos.map(todo => {
                        return (
                            <li key={todo.id}>
                                <input type="checkbox" checked={todo.isChecked}
                                       onChange={() => this.changeStatus(todo.id, !todo.isChecked)} />
                                <label contentEditable={true}
                                       onBlur={() => this.updateTextLabel(todo.id, '')}>{todo.value}</label>
                                <button onClick={() => this.removeTodo(todo.id)}>X</button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}
