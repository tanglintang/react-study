# comment-app-v2 

## 使用 react-redux

## context
作为所有组件共享状态的源头，解决公共状态的共享问题，但增加了耦合性

## provider
让 `provider` 作为树的根节点，向子组件提供 `store`，好让子组件 `connect` 的时候获取到 `store`

`provider` 是一个容器组件，还会把外界传给它的 `props.store` 放到 `context`

### reducers
```js
// 新建一个 reducer，并使用它创建一个 store
const store = createStore(commentsReducer)

ReactDOM.render(
  <Provider store={store}>
    <CommentApp />
  </Provider>,
  document.getElementById('root')
)
```
> createStore 接受一个叫 reducer 的函数作为参数，这个函数规定是一个纯函数
> reducer 接受两个参数，一个是 state，一个是 action
> 功能是 初始化和计算新的 state
```js
```

### actions
所谓 action creators 其实就是返回 action 的函数
dispatch 的时候只需要传入数据
由 action creator 帮我们构建对象

```js
// type 其实很麻烦
dispatch({ type: 'INIT_COMMENTS', comments })
```
```js
export const initComments = (comments) => {
  return { type: INIT_COMMENTS, comments }
}
```

实质是，对 action 对象的封装

### connect
connect 是一个高阶组件函数，类似于 修饰器
> **高阶组件**其实就是，传入一个组件，返回一个新的组件，作用主要是代码复用，如：几个组件都需要 ajax 请求，通过传入不同的组件以及参数，返回请求完成后的组件
```js
// wrapWithAjaxData
import React, { Component } from 'react'

export default (WrappedComponent, name) => {
  class NewComponent extends Component {
    constructor () {
      super()
      this.state = { data: null }
    }

    componentWillMount () {
      ajax.get('/data/' + name, (data) => {
        this.setState({ data })
      })
    }

    render () {
      return <WrappedComponent data={this.state.data} />
    }
  }
  return NewComponent
}
```
```js
import wrapWithAjaxData from './wrapWithAjaxData'

class InputWithUserName extends Component {
  render () {
    return <input value={this.props.data} />
  }
}

InputWithUserName = wrapWithAjaxData(InputWithUserName, 'username')
export default InputWithUserName
```

`connect` 把 `纯组件` 和 `context` 连接起来了
connect 函数接受一个组件 WrappedComponent 作为参数,

Connect 会去 context 里面取出 store

把 store 里面的数据取出来通过 props 传给 WrappedComponent

接受两个参数 mapStateToProps 和 mapDispatchToProps，
分别用于告诉 connect 这个组件 需要什么数据 和 需要触发什么 action

### dumb 组件和 smart 组件
component 里尽量做 dumb 组件，也叫纯组件，它只依赖于 props ，可以提高复用性

smart 组件，即 container 里的组件，主要用来执行特定的逻辑
