# react-app

## react 脚手架安装

`yarn global add  create-react-app`

`npm install  -g  create-react-app`

## 新建项目
```
npx create-react-app my-app
cd my-app
npm start / yarn start
```

## react-dom react模板
> 入口文件 `index.js` 全局样式 `index.css`

`import ReactDOM from 'react-dom';`

```js
// 将组建 APP 挂载到 root 根节点上
ReactDOM.render(<App />, document.getElementById('root'))
```

- React
- ReactDOM
- Component     
    组件类 继承的概念       
    class App extends Component

## vue ? react

vue:
- .vue
- template + js + style

react:  
- .js
- component组件类 继承的概念 
- jsx 语法
```jsx
render() {
    return ( 
        <div></div>
    )
}
```
- render 渲染组件

## state
> vue data
- 状态更新 setState()
```js
this.setState({
    entities: _entities
})
```
- 异步更新
> 第二种形式的 setState() 来接受一个函数而不是一个对象。 该函数将接收先前的状态作为第一个参数，将此次更新被应用时的props做为第二个参数(可省略)
```js
this.setState(prevState => {
    return {
        open: !prevState.open
    }
})
```


## jsx 模板引擎
> react 解析模板， html node 会编译称为 js ，class 是关键字 ，类名使用 className


## 事件监听
> 更像 js 原生的事件注册

**需要绑定 this**

`onClick={ this.createEntry.bind(this)(props) }`

> bind 绑定 this，bind方法返回的仍然是一个函数

- 两种方式事件监听
> 通过箭头函数的方式，事件对象必须显式的进行传递，但是通过 bind 的方式，事件对象以及更多的参数将会被隐式的进行传递。

```js
<div className="header" onClick={ this.toggle.bind(this) }>
```
```js
<i className="right floated trash icon" onClick={ () => this.state.destroyEntity(this.state.entity) }></i>
```

## react 内的 {}
> {} 是 jsx 运行区域，可以 html 可以 js
```jsx
// 类似 v-if 
{ !this.state.entities.length && <span className="ui small disabled header">还没有笔记，请先添加</span> }
```
> `!this.state.entities.length` 为真则不执行 && 之后

```js
// v-for

    const entities = this.state.entities
    const noteItems = entities.map((entity, index) => 
        <li key={index}>{entity}</li>
    )
    // 当你在map()方法的内部调用元素时，你最好随时记得为每一个元素加上一个独一无二的key。
```

## 子组件传值
```js
    state = {
        entity = this.props.entity
    }
```

## 向父组件传递事件
```jsx
// 子组件
onClick={ () => this.state.destroyEntity(this.state.entity) }

// 父组件传值(属性、方法)通过 props
state = {
    entity: this.props.entity,
    destroyEntity: this.props.destroyEntity
}
```
```js
// 父组件 
<Note key={entity.$loki} entity={entity} destroyEntity={ this.destroyEntity.bind(this) } />


destroyEntity () {

}
```

## 业务实现常用 npm 包
- lodash    一个现代JavaScript实用程序库，提供模块化，性能和附加功能
- lokijs    内存数据库
- moment    日期处理类库

# 阮一峰-react-demo

## 包含关系-嵌套传递子组件 children
> 如同 vue-slot 
```js
class App extends Component {
    render () {
        return (
            <div className="App">
                <NoteList>
                    <span>hello</span>
                    <span>world</span>
                </NoteList>
            </div>
        )
    }
}
```
```js
class NoteList extends Component {
    render () {
        return (
            <ul>{ this.props.children.map((child, index) => <li key={index}>{ child }</li>) }</ul>
        )
    }
}
```
## propTypes 参数类型检测
> PropTypes 包含一整套验证器，可用于确保你接收的数据是有效的

`yarn add prop-types`

```js
MyTitle.propTypes = {
    title: PropTypes.string
}
```
## refs
> 下面是几个适合使用 refs 的情况：
>> 处理焦点、文本选择或媒体控制。

>> 触发强制动画。

>> 集成第三方 DOM 库
```js
<input type="text" ref="myTextInput"/>
<input type="button" value="focus the text input" onClick={ this.handleClick.bind(this) }/>

handleClick () {
    this.refs.myTextInput.focus()
}
```

## 双向绑定 onChange
> vue - v-model， 在 react 中只有单向绑定

```js
<div className="App">
    <div>
        <input type="text" value={value} onChange={ this.handleChange.bind(this) } />
    </div>
    <p>{ value }</p>
</div>

handleChange (event) {
    const value = event.target.value
    this.setState({
        value
    })
}
```

## style 和 生命周期
```js
<div style={{ opacity: this.state.opacity }}>
    Hello { this.props.name }
</div>


    // 生命周期 在组件被装配后立即调用
    componentDidMount () {
        setInterval(() => {
            let opacity = this.state.opacity
            opacity -= 0.2
            if (opacity < 0.1) {
                opacity = 1
            }
            this.setState({
                opacity
            })
        }, 100)
    }
```

## 数据请求