import React from 'react'

const TodoCounts = ({ todos }) => {
    const allTodos = todos.length
    const doneTodos = todos.filter(todo => todo.isChecked).length
    const undoneTodos = allTodos - doneTodos
    return (
        <div>
            <p>General count of todos - <span>{allTodos}</span></p>
            <p>Count of done - <span>{doneTodos}</span></p>
            <p>Count of undone - <span>{undoneTodos}</span></p>
        </div>
    )
}

export default TodoCounts
