const apiEndPoint = 'http://localhost:4000/api/todos'
const headers = new Headers()

headers.append('Accept', 'application/json')
headers.append('Content-Type', 'application/json')

const addTodo = todo => fetch(apiEndPoint, {
    method: 'POST',
    body:   JSON.stringify(todo),
    headers
})

const removeTodo = id => fetch(apiEndPoint, {
    method: 'DELETE',
    body:   JSON.stringify({ id }),
    headers
})

const updateTodo = todo => fetch(apiEndPoint, {
    method: 'PATCH',
    body:   JSON.stringify(todo),
    headers
})

const getTodos = () =>
    fetch(apiEndPoint)
        .then(res => res.json())

export {
    addTodo,
    removeTodo,
    updateTodo,
    getTodos
}
