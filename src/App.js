import React, { Component } from 'react'
import './static/css/app.css'
import { Todolist } from './components/Todolist'
import netlifyIdentity from 'netlify-identity-widget'

class App extends Component {
    state = {
        isAuthenticated: netlifyIdentity.currentUser() !== null
    }

    login = () => {
        netlifyIdentity.open()
        netlifyIdentity.on('login', () => {
            this.setState({
                isAuthenticated: true
            })
            netlifyIdentity.close()
        })
    }

    logout = () => {
        netlifyIdentity.open()
        netlifyIdentity.on('logout', () => {
            this.setState({
                isAuthenticated: false
            })
            netlifyIdentity.close()
        })
    }

    render() {
        if (!this.state.isAuthenticated) {
            return (
                <div className="App">
                    <button onClick={this.login}>Log in</button>
                </div>
            )
        }

        return (
            <div className="App">
                <Todolist />
                <button onClick={this.logout}>Log out</button>
            </div>
        )
    }
}

export default App
