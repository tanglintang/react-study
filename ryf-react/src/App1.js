import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {

    const names = ['Alice', 'Emily', 'Kaiser']
    const showName = names.map((name, index) => <li key={index}>Hello, {name}</li>)

    return (
      <div className="App">
        <ul>
          { showName }
        </ul>
      </div>
    );
  }
}

export default App;
