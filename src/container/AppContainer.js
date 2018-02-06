import React, { Component } from 'react'
import { Todo } from 'components'
import { getTodos } from 'components/todo/todo.service'

export default class AppContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos: []
        }
    }

    componentWillMount() {
        getTodos()
            .then(todos => this.setState({ todos }))
    }

    render() {
        const { todos } = this.state
        return (
            <Todo todos={todos} />
        )
    }
}
