import React, { Component } from 'react'
import './static/css/app.css'
import { Todolist } from './components/Todolist'
import netlifyIdentity from 'netlify-identity-widget'

class App extends Component {
    login = () => {
        netlifyIdentity.open()
        netlifyIdentity.on('login', () => {
            this.forceUpdate()
            netlifyIdentity.close()
        })
    }

    logout = () => {
        netlifyIdentity.open()
        netlifyIdentity.on('logout', () => {
            this.forceUpdate()
            netlifyIdentity.close()
        })
    }

    render() {
        if (netlifyIdentity.currentUser() === null) {
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
