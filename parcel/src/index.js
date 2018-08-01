import React from './react'
import ReactDOM from './react-dom'

class Counter extends React.Component {
    constructor (props) {
        super (props)
    }
    click() {}
    render () {
        return (
            <div className="counter" onClick={() => {}}>
                Counter
            </div>
        )
    }
}

// function tick () {
    const element = (
        <div>
            <h1>Hello world</h1>
            <Counter />
            <Counter />
            <h2>It is { new Date().toLocaleTimeString() }.</h2>
        </div>
    )
    
    // 为什么要用 ReactDOM 在 react 中还是要引用 react
    
    ReactDOM.render(
        element,
        document.getElementById('root')
    )
// }

// setInterval(tick, 1000)
