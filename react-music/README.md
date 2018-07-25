# React Music

## 使用 rewire 定制 webpack 工作流

- 安装 rewire
`$ yarn add rewire proxyquire`

- 新建 scripts 目录

- 更改 npm script


1. stylus
2. alias
3. autoprefixer

## react 路由配置
`import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'`
Switch : router-view

## jsonp 请求配置

### url 参数拼接
```js
function buildURL (url, data) {
  let params = []
  for (const key in data) {
    params.push(`${key}=${data[key]}`)
  }
  let param = params.join('&')
  if (url.indexOf('?') === -1) {
    url += '?' + param
  } else {
    url += '&' + param
  }
  return url
}
```