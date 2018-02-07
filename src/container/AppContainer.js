import React, { Component } from 'react'
import { Todo } from 'components'
import { getTodos } from 'api'

export default class AppContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos: []
        }
        this.fetchTodos = this.fetchTodos.bind(this)
    }

    fetchTodos() {
        getTodos()
            .then(todos => this.setState({ todos }))
    }

    componentWillMount() {
        this.fetchTodos()
    }

    render() {
        return (
            <Todo todos={this.state.todos} onFetchTodos={this.fetchTodos} />
        )
    }
}
