import React, { Component } from 'react';
import Notes from './components/Notes'
import './App.css';

// 组件类 继承的概念
// jsx 语法 render 渲染组件
class App extends Component {
  render() {
    return (
      <Notes />
    );
  }
}

export default App;
