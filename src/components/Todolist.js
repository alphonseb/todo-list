import React from 'react'
import { TodoForm } from './todo-components/TodoForm'
import { Todo } from './todo-components/Todo'
import base from '../base'

export class Todolist extends React.Component {
    state = {
        todos: [],
        filter: 'uncomplete'
    }

    componentDidMount() {
        this.getData()
    }

    getData = async () => {
        const baseData = await base.fetch('todo1/todos', { context: this })

        if (baseData.length) {
            this.setState({ todos: Object.values(baseData) })
        } else {
            await base.post('todo1/owner', {
                data: 'fen'
            })
        }
        this.href = base.syncState('todo1/todos', {
            context: this,
            state: 'todos',
            asArray: true
        })
    }

    componentWillUnmount() {
        base.removeBinding(this.ref)
    }

    addToDo = async todo => {
        await this.setState(state => {
            return {
                todos: [todo, ...state.todos]
            }
        })

        // await localStorage.setItem('todos', JSON.stringify(this.state.todos))
    }

    deleteToDo = async _id => {
        await this.setState(state => {
            return { todos: state.todos.filter(todo => todo.id !== _id) }
        })

        // await localStorage.setItem('todos', JSON.stringify(this.state.todos))
    }

    deleteAll = async () => {
        await this.setState({
            todos: []
        })

        // await localStorage.setItem('todos', JSON.stringify(this.state.todos))
    }

    toggleToDo = async _todo => {
        await this.setState(state => {
            return {
                todos: state.todos.map(todo => {
                    if (_todo.id === todo.id) {
                        return {
                            id: _todo.id,
                            name: todo.name,
                            complete: _todo.complete
                        }
                    } else {
                        return todo
                    }
                })
            }
        })
        // await localStorage.setItem('todos', JSON.stringify(this.state.todos))
    }

    updateFilter = _filterName => {
        this.setState({
            filter: _filterName
        })
    }

    render() {
        return (
            <div className="todo-list">
                <h2>To Do</h2>
                <p>
                    You have{' '}
                    {this.state.todos.filter(todo => !todo.complete).length}{' '}
                    uncomplete tasks left.
                </p>
                <div>
                    <button onClick={() => this.updateFilter('uncomplete')}>
                        Show Uncomplete (
                        {this.state.todos.filter(todo => !todo.complete).length}
                        )
                    </button>
                    <button onClick={() => this.updateFilter('complete')}>
                        Show Complete (
                        {this.state.todos.filter(todo => todo.complete).length})
                    </button>
                    <button onClick={() => this.updateFilter('all')}>
                        Show all ({this.state.todos.length})
                    </button>
                </div>
                <TodoForm addToDo={this.addToDo} />
                {this.state.todos
                    .filter(todo => {
                        if (this.state.filter === 'complete') {
                            return todo.complete
                        } else if (this.state.filter === 'uncomplete') {
                            return !todo.complete
                        }
                        return todo
                    })
                    .map(todo => (
                        <Todo
                            key={todo.id}
                            id={todo.id}
                            complete={todo.complete}
                            name={todo.name}
                            toggleToDo={this.toggleToDo}
                            deleteToDo={this.deleteToDo}
                        />
                    ))}
                <div>
                    <button onClick={this.deleteAll}>Delete all</button>
                </div>
            </div>
        )
    }
}
