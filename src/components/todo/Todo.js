import React, { Component } from 'react'
import TodoCounts from './TodoCounts'
import TodoFormAdd from './TodoFormAdd'
import TodoItem from './TodoItem'
import { addTodo, removeTodo, updateTodo } from 'api'

export class Todo extends Component {
    constructor(props) {
        super(props)
        this.handleCreateTodo = this.handleCreateTodo.bind(this)
        this.handleChangeStatus = this.handleChangeStatus.bind(this)
        this.handleChangeTitle = this.handleChangeTitle.bind(this)
        this.handleRemoveTodo = this.handleRemoveTodo.bind(this)
    }

    handleChangeStatus(id, isChecked) {
        return this.onUpdateTodo({
            id,
            isChecked
        })
    }

    handleChangeTitle(id, value) {
        return this.onUpdateTodo({
            id,
            value
        })
    }

    handleRemoveTodo(todoId) {
        return removeTodo(todoId)
            .then(this.props.onFetchTodos)
    }

    handleCreateTodo(event, value) {
        event.preventDefault()
        return addTodo({ value })
            .then(this.props.onFetchTodos)
    }

    onUpdateTodo(todo) {
        return updateTodo(todo)
            .then(this.props.onFetchTodos)
    }

    render() {
        const { todos } = this.props
        return (
            <div>
                <TodoCounts todos={todos} />
                <TodoFormAdd
                    onCreateTodo={this.handleCreateTodo}
                />
                <ul className="todo-list">
                    {todos.map(todo => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onChangeStatus={this.handleChangeStatus}
                            onChangeTitle={this.handleChangeTitle}
                            onRemoveTodo={this.handleRemoveTodo}
                        />
                    ))}
                </ul>
            </div>
        )
    }
}
