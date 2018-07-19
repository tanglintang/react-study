import React, { Component } from 'react'
import './App.css'

class LikeButton extends Component {
    state = {
        liked: false
    }

    handleClick () {
        this.setState(preState => {
            return { 
                liked: !preState.liked
            }
        })
    }

    render () {
        const text = this.state.liked ? 'like' : 'dislike'
        return (
            <p onClick={() => this.handleClick() }>
                You { text } this.click to toggle
            </p>
        )
    }
}

class App extends Component {

    handleClick () {
        this.refs.myTextInput.focus()
    }

    render () {
        return (
            <div className="App">
                <LikeButton />
                <input type="text" ref="myTextInput"/>
                <input type="button" value="focus the text input" onClick={ this.handleClick.bind(this) }/>
            </div>
        )
    }
}

export default App
