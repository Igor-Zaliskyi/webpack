import React, { Component } from 'react'

export default class TodoItem extends Component {
    render() {
        const { todo, onChangeStatus, onChangeTitle, onRemoveTodo } = this.props
        return (
            <li>
                <input type="checkbox"
                       checked={todo.isChecked}
                       onChange={() => onChangeStatus(todo.id, !todo.isChecked)} />
                <label contentEditable="true"
                       suppressContentEditableWarning="true"
                       ref={label => this.label = label}
                       onBlur={() => onChangeTitle(todo.id, this.label.textContent)}>{todo.value}</label>
                <button onClick={() => onRemoveTodo(todo.id)}>X</button>
            </li>
        )
    }
}
