# umi - react 快速框架
- 内置 react 、react-router
- 以约定代替，简化代码，
- pages 目录下的文件即路由，而文件则导出 react 组件

// PureComponent 纯组件 没有外部数据，单纯做界面输出
// 函数组件 () => (<div>JSX</div>) React.createElement

## 基本目录
```
+ src
  + layouts/index.js
  + pages
    - a.js
    - b.js
    - 404.js
```

## layouts 默认为根组件父组件
```js
{
  component: 'layouts/index.js',
  routes: [
    { path: '/a', exact: true, component: 'pages/a.js' },
    { path: '/b', exact: true, component: 'pages/b.js' },
    { component: 'pages/404.js' },
  ],
}
```

> 通过 { this.props.children } 显示子组件
```js
<div>layouts
  { this.props.children }
</div>
```
## proxy

> 代理方式实现跨域

```js
proxy: {
  '^/restapi': {
    hub: 'eleme-demo',
  },
},
```

