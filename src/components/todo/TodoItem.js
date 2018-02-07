import React, { Component } from 'react'
import { removeTodo, updateTodo } from 'api'

export default class TodoItem extends Component {
    changeStatus(id, isChecked) {
        return this.updateTodo({
            id,
            isChecked
        })
    }

    changeTitle(id, value) {
        return this.updateTodo({
            id,
            value
        })
    }

    removeTodo(todoId) {
        return removeTodo(todoId)
            .then(this.props.fetchTodos)
    }

    updateTodo(todo) {
        return updateTodo(todo)
            .then(this.props.fetchTodos)
    }

    render() {
        const { todo } = this.props
        return (
            <li>
                <input type="checkbox"
                       checked={todo.isChecked}
                       onChange={() => this.changeStatus(todo.id, !todo.isChecked)} />
                <label contentEditable="true"
                       suppressContentEditableWarning="true"
                       ref={label => this.label = label}
                       onBlur={() => this.changeTitle(todo.id, this.label.value)}>{todo.value}</label>
                <button onClick={() => this.removeTodo(todo.id)}>X</button>
            </li>
        )
    }
}
