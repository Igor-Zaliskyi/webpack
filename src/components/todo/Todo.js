import React, { Component } from 'react'
import TodoCounts from './TodoCounts'
import TodoFormAdd from './TodoFormAdd'
import TodoItem from './TodoItem'

export class Todo extends Component {
    render() {
        const { todos, fetchTodos } = this.props
        return (
            <div id="todo-app">
                <TodoCounts todos={todos} />
                <TodoFormAdd fetchTodos={fetchTodos} />
                <ul className="todo-list">
                    {todos.map(todo => (<TodoItem key={todo.id} todo={todo} fetchTodos={fetchTodos} />))}
                </ul>
            </div>
        )
    }
}
