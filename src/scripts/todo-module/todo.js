// 1. Save value on change

const getTodoHTML = (item, index, callbacks) => {
    const { changeStatusById, removeTodoById, seveTextLabel} = callbacks
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
    input.onchange = () => changeStatusById(item.id, li)
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
    const todoLocalStorageKey = 'todos'
    const generalCount = document.getElementById('generalCount')
    const doneCount = document.getElementById('doneCount')
    const undoneCount = document.getElementById('undoneCount')

    const changeStatusById = (todoId, parentElement) => {
        const todo = getTodos().find(todo => todo.id === todoId)
        todo.isChecked = !todo.isChecked
        parentElement.classList.toggle('active')

        updateTodo(todo)

        // @todo Y. L. remove it after api
        renderTodoCounts()
    }
    
    const seveTextLabel = (todoId, label) => {
        const todo = getTodos().find(todo => todo.id === todoId)
        todo.value = label
        
        updateTodo(todo)
    }
    
    const render = () => {
        renderTodoList()
        renderTodoCounts()
    }

    const renderTodoCounts = () => {
        const todos = getTodos()
        const count = todos.length
        const done = todos.filter(item => item.isChecked).length
        const undone = count - done

        generalCount.textContent = count
        doneCount.textContent = done
        undoneCount.textContent = undone
    }

    const renderTodoList = () => {
        todoAppView.innerHTML = ''
        console.log(getTodos())
        getTodos()
            .map((item, index) => getTodoHTML(item, index, {
                changeStatusById,
                removeTodoById,
                seveTextLabel
            }))
            .forEach(liEelement => todoAppView.appendChild(liEelement))
    }

    const removeTodoById = todoId => {
        const todos = getTodos()
        const index = todos.findIndex(todo => todo.id === todoId)

        todos.splice(index, 1)
        saveTodos(todos)
        render()
    }

    const addTodo = todoText => {
        const todos = getTodos()
        todos.push({
            id:        todos.length + 1,
            value:     todoText,
            isChecked: false
        })

        saveTodos(todos)
        render()
    }

    const getTodos = () => {
        return JSON.parse(localStorage.getItem(todoLocalStorageKey)) || []
    }

    const updateTodo = todo => {
        const { id: todoId } = todo
        const todos = getTodos()
        const targetTodo = todos.find(currentTodo => currentTodo.id === todoId)
        Object.assign(targetTodo, todo)
        saveTodos(todos)
    }

    // @todo Y. L. remove it after api
    const saveTodos = todos => {
        localStorage.setItem(todoLocalStorageKey, JSON.stringify(todos))
    }

    render()

    return {
        addTodo
    }
}
