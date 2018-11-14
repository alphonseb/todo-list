import React from 'react'

export class Todo extends React.Component {
    state = {
        complete: this.props.complete
    }

    handleChange = _event => {
        this.setState({
            [_event.target.name]: _event.target.checked
        })
        this.props.toggleToDo({
            id: this.props.id,
            complete: _event.target.checked,
            name: this.props.name
        })
    }

    render() {
        return (
            <div>
                <input
                    checked={this.state.complete}
                    type="checkbox"
                    name="complete"
                    id={this.props.id}
                    onChange={this.handleChange}
                />
                <label
                    style={
                        this.state.complete
                            ? { textDecoration: 'line-through' }
                            : {}
                    }
                    htmlFor={this.props.id}
                >
                    {this.props.name}
                </label>
                <button onClick={() => this.props.deleteToDo(this.props.id)}>
                    &times;
                </button>
            </div>
        )
    }
}
