jsx(transform-react-jsx) -> vnode(createELement) -> DOM(render)

babel 预编译将 jsx -> 虚拟 DOM 节点 -> render 将虚拟 DOM 转为 真实 DOM -> 渲染到页面

## createELement 返回一个虚拟 DOM 对象 在内存中
```js
function createElement (tag, attrs, ...children) {
  return {
    tag,
    attrs,
    children,
    key
  }
}
```

## render 方法接收 虚拟 DOM 对象 并挂载到真实 DOM
```js
ReactDom.render(
  <div>Hello
    <span> World !</span>
  </div>,
  document.getElementById('root')
)
```
**render 内部返回**
```js
export function render(vnode, container) {
  console.log(vnode, container)
    // {tag: "div", attrs: {…}, children: Array(1), key: "Hello"}
}
```

## Component(render的第三种方式)
```js
  // 2. 节点类型 三种：
      // 文本节点 createTextNode()
      // 标签节点 createElement() 设置 attributes、children =》递归 _render()
      // component 内部实现 render() 方法 、 返回一段 jsx 需要实例化这个组件 获取 jsx和虚拟DOM 然后 render() 递归
```

Component(render 的第三种方式， 
react-jsx 会将组件的tag 解析为 function Counter) -> 标签化的组件
-> Counter(extends) -> Component 类 -> render方法 里面的jsx -> ReactDOM.render()


setState() 设置新state之后 
component 会手动调用 renderComponent(this) 方法重新渲染页面，
```js
// renderComponent 函数
// 非 第一次渲染
  if (component.base && component.base.parentNode) {
    // 旧节点 的父节点 替换掉
    component.base.parentNode.replaceChild(base, component.base)
  }
```

**问题**：
整个counter组件都会被渲染
不应当
只改变组件内部的 一小块
减少 DOM 开销


## 响应式 setState()
为了达到 DOM 更新 将整个 DOM 片段都替换掉
1. 新生成整个的 组件 DOM 树，重新挂载，100行 html
2. 只将 setState 关联的一小段 DOM，在原来的基础上做一下修改，将修改反应到 DOM 上，修改 1 行

DOM 开销是一般计算开销的 100-1000倍
重绘：replaceChild
重排：

需求，减少 DOM 操作
setState 对应的 DOM 部分

# react - diff 算法
需求，减少 DOM 操作
setState 对应的 DOM 部分
setState 返回一个新的 VNode
将新的 （内存）虚拟DOM 和 旧的 DOM 对比？
都是 树状结构 
逐层比较