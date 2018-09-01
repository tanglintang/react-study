# Comment-App

## ref
```js
componentDidMount () {
  this.input.focus()
}
```
```js
<input ref={(input) => this.input = input} />
```
> input 元素加了一个 ref 属性，这个属性值是一个函数，
> input 元素在页面挂载完成后，调用函数
> 把 挂载后的 DOM 节点传给这个函数
> 在函数中我们把这个 DOM 元素设置为组件实例的一个属性，这样以后我们就可以通过 this.input 获取到这个 DOM 元素

## propTypes 参数检测
```js
static propTypes = {
  comment: PropTypes.object.isRequired,
  onDeleteComment: PropTypes.func,
  index: PropTypes.number
}
```

## +Date.now()
一元操作符
1. +
对于其他类型的变量则是转化成数字类型的变量` (Number)转换`，如果转化失败，则为特殊数字类型常量 NaN

## this.props.methods
子组件向父组件传值或父组件调用子组件方法，需要使用状态提升

## 组件内方法顺序
```js
constructor() {}
componentWillMount() {} 生命周期函数
_privateMethod() {}     私有方法
publicMethod() {}
render() {}
```