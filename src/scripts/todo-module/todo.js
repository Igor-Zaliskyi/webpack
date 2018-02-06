// 1. Save value on change
import * as api from './todo.service'

const getTodoHTML = (item, index, callbacks) => {
    const { changeStatus, removeTodo, updateTextLabel } = callbacks
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
    input.onchange = () => changeStatus(item.id, !item.isChecked)
    // label.setAttribute('for', id)
    label.innerText = item.value
    label.setAttribute('contenteditable', 'true')
    // @todo I. Z. do it!
    label.onblur = () => updateTextLabel(item.id, label.textContent)

    button.onclick = () => removeTodo(item.id)
    button.innerText = 'X'
    li.appendChild(input)
    li.appendChild(label)
    li.appendChild(button)

    return li
}

const getCountElement = descriptionText => {
    const wrapper = document.createElement('p')
    const count = document.createElement('span')
    const description = document.createTextNode(`${descriptionText} - `)
    wrapper.appendChild(description)
    wrapper.appendChild(count)
    return { wrapper, count }
}

const getForm = addTodo => {
    const form = document.createElement('form')
    const input = document.createElement('input')
    input.setAttribute('type', 'text')
    input.setAttribute('placeholder', 'Enter name new todo')
    const submit = document.createElement('input')
    submit.setAttribute('type', 'submit')
    submit.setAttribute('value', 'Add todo')

    form.appendChild(input)
    form.appendChild(submit)
    form.onsubmit = event => {
        event.preventDefault()
        addTodo(input.value)
    }

    return form
}

export const Todo = container => {
    const todoAppView = document.querySelector(container)
    const { wrapper: wrapperGeneralCount, count: generalCount } = getCountElement('General count of todos')
    const { wrapper: wrapperDoneCount, count: doneCount } = getCountElement('Count of done')
    const { wrapper: wrapperUndoneCount, count: undoneCount } = getCountElement('Count of undone')
    const list = document.createElement('ul')

    const changeStatus = (id, isChecked) => updateTodo({
        id,
        isChecked
    })

    const updateTextLabel = (id, value) => updateTodo({
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
        list.innerHTML = ''
        todos
            .map((item, index) => getTodoHTML(item, index, {
                changeStatus,
                removeTodo,
                updateTextLabel
            }))
            .forEach(liEelement => list.appendChild(liEelement))
    }

    const removeTodo = todoId => api.removeTodo(todoId)
        .then(render)

    const addTodo = todoText => api.addTodo({ value: todoText })
        .then(render)

    const updateTodo = todo => api.updateTodo(todo)
        .then(render)


    const createTodoTemplate = () => {
        const form = getForm(addTodo)
        list.className = 'todo-list'

        todoAppView.appendChild(wrapperGeneralCount)
        todoAppView.appendChild(wrapperDoneCount)
        todoAppView.appendChild(wrapperUndoneCount)
        todoAppView.appendChild(form)
        todoAppView.appendChild(list)

        render()
    }

    return {
        createTodoTemplate
    }
}
