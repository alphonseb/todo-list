import React, { Component } from 'react'
import './static/css/app.css'
import { Todolist } from './components/Todolist'
import netlifyIdentity from 'netlify-identity-widget'

class App extends Component {
    state = {
        isAuthenticated: false
    }

    login = () => {
        netlifyIdentity.open()
        netlifyIdentity.on('login', () => {
            console.log('logged in')
        })
    }

    render() {
        return (
            <div className="App">
                <button onClick={this.login}>Log in</button>
                {/* <Todolist /> */}
            </div>
        )
    }
}

export default App
