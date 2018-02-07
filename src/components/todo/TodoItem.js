import React from 'react'

const TodoItem = ({ todo, onChangeStatus, onChangeTitle, onRemoveTodo }) => {
    let label
    return (
        <li>
            <input type="checkbox"
                   checked={todo.isChecked}
                   onChange={() => onChangeStatus(todo.id, !todo.isChecked)} />
            <label contentEditable="true"
                   suppressContentEditableWarning="true"
                   ref={labelEl => label = labelEl}
                   onBlur={() => onChangeTitle(todo.id, label.textContent)}>{todo.value}</label>
            <button onClick={() => onRemoveTodo(todo.id)}>X</button>
        </li>
    )
}

export default TodoItem
