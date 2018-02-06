import * as api from './todo.service'
import React, { Component } from 'react'
import { getCountElement, getForm, getTodoHTML } from './todo.helper'

export class Todo extends Component {
    constructor (props) {
        super(props)
        const { wrapper: wrapperGeneralCount, count: generalCount } = getCountElement('General count of todos')
        const { wrapper: wrapperDoneCount, count: doneCount } = getCountElement('Count of done')
        const { wrapper: wrapperUndoneCount, count: undoneCount } = getCountElement('Count of undone')
        this.list = document.createElement('ul')
        this.wrapperGeneralCount = wrapperGeneralCount
        this.generalCount = generalCount
        this.wrapperDoneCount = wrapperDoneCount
        this.doneCount = doneCount
        this.wrapperUndoneCount = wrapperUndoneCount
        this.undoneCount = undoneCount
        this.render = this.render.bind(this)
    }

    changeStatus(id, isChecked) {
        return this.updateTodo({
            id,
            isChecked
        })
    }

    updateTextLabel(id, value) {
        return this.updateTodo({
            id,
            value
        })
    }

    render() {
        return (
            <div>Todoooo</div>
        )
        // return api.getTodos()
        //     .then(todos => {
        //         this.renderTodoList(todos)
        //         this.renderTodoCounts(todos)
        //     })
    }

    renderTodoCounts(todos) {
        const count = todos.length
        const done = todos.filter(item => item.isChecked).length
        const undone = count - done

        this.generalCount.textContent = count
        this.doneCount.textContent = done
        this.undoneCount.textContent = undone
    }

    renderTodoList(todos) {
        const { list, changeStatus, removeTodo, updateTextLabel } = this
        list.innerHTML = ''
        todos
            .map((item, index) => getTodoHTML(item, index, {
                changeStatus:    changeStatus.bind(this),
                removeTodo:      removeTodo.bind(this),
                updateTextLabel: updateTextLabel.bind(this)
            }))
            .forEach(liEelement => list.appendChild(liEelement))
    }

    removeTodo(todoId) {
        return api.removeTodo(todoId)
            .then(this.render)
    }

    addTodo(todoText) {
        return api.addTodo({ value: todoText })
            .then(this.render)
    }

    updateTodo(todo) {
        return api.updateTodo(todo)
            .then(this.render)
    }


    createTodoTemplate() {
        const { todoAppView, list } = this
        const form = getForm(this.addTodo.bind(this))
        list.className = 'todo-list'

        todoAppView.appendChild(this.wrapperGeneralCount)
        todoAppView.appendChild(this.wrapperDoneCount)
        todoAppView.appendChild(this.wrapperUndoneCount)
        todoAppView.appendChild(form)
        todoAppView.appendChild(list)

        return this.render()
    }
}
