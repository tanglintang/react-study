import React, { Component } from 'react'
import './App.css'

class App extends Component {
    state = {
        value: 'oyia'
    }

    handleChange (event) {
        const value = event.target.value
        this.setState({
            value
        })
    }

    render () {
        const value = this.state.value
        return (
            <div className="App">
                <div>
                    <input type="text" value={value} onChange={ this.handleChange.bind(this) } />
                </div>
                <p>{ value }</p>
            </div>
        )
    }
}

export default App
