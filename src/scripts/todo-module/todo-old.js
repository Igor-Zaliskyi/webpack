const todos = [
    {
        id:        1,
        value:     "Купити квитки",
        isChecked: false
    },
    {
        id:        2,
        value:     "Поїхати додому",
        isChecked: true
    },
    {
        id:        3,
        value:     "Замовити таксі",
        isChecked: false
    }
]

const todoAppView = document.getElementById("todo-list")

const changeStatusById = todoId => {
    const todo = todos.find(todo => todo.id === todoId)
    todo.isChecked = !todo.isChecked
}

const getTodoHTML = (item, index) => `<li>
    <input type="checkbox" id="todo${index}" ${item.isChecked
    ? "checked"
    : ""} onChange="changeStatusById(${item.id})"/>             
    <label for="todo${index}">${item.value}</label>
    <button onclick="removeTodoById(${item.id})">X</button>
  </li>`

const renderTodoList = () => {
    todoAppView.innerHTML = todos.map(getTodoHTML).join("")
    // todoAppView.innerHTML = (function () {
    //     let todosHtml = ''
    //     todos.forEach((item, index) => {
    //         todosHtml += getTodoHTML(item, index)
    //     })
    //     return todosHtml
    // })();
}

// Why do you need forEach
// todos.forEach((item) => {
//     item.isChecked = true;
// })


const addTodo = () => {
    const input = document.getElementById("input").value
    todos.push({
        id:        todos.length + 1,
        value:     input,
        isChecked: false
    })

    renderTodoList()
    return false
}

renderTodoList()


const removeTodoById = todoId => {

    const index = todos.findIndex(todo => todo.id === todoId)

    todos.splice(index, 1)
    renderTodoList()
    return false
}


window.addTodo = addTodo
window.changeStatusById = changeStatusById
window.removeTodoById = removeTodoById
