import React, { Component } from 'react'
import './App.css'

class UserGist extends Component {
    state = {
        username: ''
    }

    render () {
        return (
            <div>
                { this.state.username }' s last gist is <a href={ this.state.lastGistUrl }>here</a>
            </div>
        )
    }

    componentDidMount () {
        fetch(this.props.source)
        .then(data => data.json())
        .then(data => {
            console.log(data)
            const lastGist = data[0]
            this.setState({
                username: lastGist.owner.login,
                lastGist: lastGist.html_url
            })
        })
    }
}

class App extends Component {

    render () {
        return (
            <div className="App">
                <UserGist source="https://api.github.com/users/octocat/gists" />
            </div>
        )
    }
}

export default App
