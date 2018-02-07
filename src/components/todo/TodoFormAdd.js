import React from 'react'

const TodoFormAdd = ({ onCreateTodo }) => {
    let input
    return (
        <form onSubmit={event => onCreateTodo(event, input.value)}>
            <input type="text" placeholder="Enter name new todo" ref={inputEl => input = inputEl} />
            <input type="submit" value="Add todo" />
        </form>
    )
}

export default TodoFormAdd
