// 1. Save value on change
import * as api from './todo.service'

const getTodoHTML = (item, index, callbacks) => {
    const { changeStatusById, removeTodoById, seveTextLabel } = callbacks
    const li = document.createElement('li')
    const input = document.createElement('input')
    const label = document.createElement('label')
    const button = document.createElement('button')
    const id = `todo${index}`

    if (item.isChecked) {
        li.className = 'active'
        input.setAttribute('checked', 'checked')
    }
    input.setAttribute('type', 'checkbox')
    // input.setAttribute('id', id)
    input.onchange = () => changeStatusById(item.id, !item.isChecked)
    // label.setAttribute('for', id)
    label.innerText = item.value
    label.setAttribute('contenteditable', 'true')
    // @todo I. Z. do it!
    label.oninput = () => seveTextLabel(item.id, label.textContent)

    button.onclick = () => removeTodoById(item.id)
    button.innerText = 'X'
    li.appendChild(input)
    li.appendChild(label)
    li.appendChild(button)

    return li
}

export const Todo = wrapperTodos => {
    const todoAppView = document.querySelector(wrapperTodos)
    const generalCount = document.getElementById('generalCount')
    const doneCount = document.getElementById('doneCount')
    const undoneCount = document.getElementById('undoneCount')

    const changeStatusById = (id, isChecked) => updateTodo({
        id,
        isChecked
    })

    const seveTextLabel = (id, value) => updateTodo({
        id,
        value
    })

    const render = () => api.getTodos()
        .then(todos => {
            renderTodoList(todos)
            renderTodoCounts(todos)
        })

    const renderTodoCounts = todos => {
        const count = todos.length
        const done = todos.filter(item => item.isChecked).length
        const undone = count - done

        generalCount.textContent = count
        doneCount.textContent = done
        undoneCount.textContent = undone
    }

    const renderTodoList = todos => {
        todoAppView.innerHTML = ''
        todos
            .map((item, index) => getTodoHTML(item, index, {
                changeStatusById,
                removeTodoById,
                seveTextLabel
            }))
            .forEach(liEelement => todoAppView.appendChild(liEelement))
    }

    const removeTodoById = todoId => api.removeTodo(todoId)
        .then(render)

    const addTodo = todoText => api.addTodo({ value: todoText })
        .then(render)

    const updateTodo = todo => api.updateTodo(todo)
        .then(render)

    render()

    return {
        addTodo
    }
}
