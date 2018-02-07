import React from 'react'
import { addTodo } from 'api'

const createTodo = (event, value, fetchTodos) => {
    event.preventDefault()
    return addTodo({ value })
        .then(fetchTodos)
}

const TodoFormAdd = ({ fetchTodos }) => {
    let input
    return (
        <form onSubmit={event => createTodo(event, input.value, fetchTodos)}>
            <input type="text" placeholder="Enter name new todo" ref={inputEl => input = inputEl} />
            <input type="submit" value="Add todo" />
        </form>
    )
}

export default TodoFormAdd
