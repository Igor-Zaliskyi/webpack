import { Todo } from './scripts'
import './sass/index.scss'

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

const MyTodo = Todo('#todo-list')

const addTodo = () => {
    const todoText = document.getElementById("input").value
    MyTodo.addTodo(todoText)
    return false
}

window.addTodo = addTodo
// window.MyTodo = MyTodo;
