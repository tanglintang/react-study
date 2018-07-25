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

## 安按照时间排序
```js
albumList.sort((a, b) => {
    return new Date(b.public_time).getTime() - new Date(a.public_time).getTime()
})
```
- nnew Date(b.public_time).getTime() 转换为时间戳
- sort()
> 比较两个值，然后返回一个用于说明这两个值的相对顺序的数字

    若 a 小于 b，在排序后的数组中 a 应该出现在 b 之前，则返回一个小于 0 的值。
    若 a 等于 b，则返回 0。
    若 a 大于 b，则返回一个大于 0 的值。

## 前端模型层
`src/model`

```js
// 通过 model 模型层 过滤数据 提供一个对象
const album = AlbumModel.createAlbumByList(item)
```
```js
// 模型层 做数据处理 
// 字段拼接。。
export function createAlbumByList (data) {
    return new Album(
        data.album_id,
        data.album_mid,
        data.album_name,
        `http://y.gtimg.cn/music/photo_new/T002R300x300M000${data.album_mid}.jpg?max_age=2592000`,
        filterSinger(data.singers),
        data.public_time
    )
}

function filterSinger (singers) {
    let singerArr = singers.map(singer => {
        return singer.singer_name
    })
    return singerArr.join('/')
}
```

## prop-types 参数检测