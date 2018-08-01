# 虚拟 DOM (Virtual DOM)
> mvvm 封装了 DOM 层, DOM 操作太耗性能
vnode + diff 

## 初始化并安装
`npm init -y`
`yarn add babel-cli babel-core babel-preset-env babel-preset-react`

## jsx
jsx 语法：用 **js 对象** 描述 html 结构

> 真实 DOM
```js
const title = <h1 className="title">hello jsx</h1>
```
> babel 编译 `babel index.js` - 虚拟 DOM
```js
"use strict";

var title = React.createElement(
  "h1",
  { className: "title" },
  "hello jsx"
);
```

- jsx 背后隐藏着 VNode 的真相
```js
    React.createElement(
        h1 **第一个参数**，`ele = document.createElement()`，创建节点
        attribute **第二个参数**，`ele.setAttribute(key, value)`
        children **第三个参数**，文本节点
    )
```
- 虚拟 DOM 描述 JOSN
```js
<h1 className="title">
    标题
    <span>副标题</span>
</h1>

VNode = {
    tag: 'h1',
    attrs: {
        class: 'title'
    },
    children: [
        '标题',
        递归子节点
    ]
}
```
