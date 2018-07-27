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

## 子路由
```js
toAlbumDetail (url) {
    return () => {
      this.props.history.push({
        pathname: url
      })
    }
}

<div className="album-wrapper" key={album.mId} onClick={ this.toAlbumDetail(`${match.url + '/' + album.mId}`) }>

const { match } = this.props

<Route path={ `${ match.url + '/:id' }` } component={ Album }></Route>
```
`match.url` 得到当前路由路径
`/:id` 参数


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

## redux
`$ yarn add redux react-redux`

> 同 vuex-store

应用中所有的 state 都以一个对象树的形式储存在一个单一的 store 中。 
- store
```js
// 创建 store 并传入 reduces
const store = createStore(reducers)
```
- reduces
惟一改变 state 的办法是触发 action，一个描述发生什么的对象。为了描述 action 如何改变 state 树，你需要编写 reducers。

Reducer 函数最重要的特征是，它是一个纯函数。也就是说，只要是同样的输入，必定得到同样的输出

Reducer 函数里面不能改变 State，必须返回一个全新的对象

```js
const initialState = {
    song: {},
    songs: [],
    showStatus: false
}
// reduce 传入一个 state, action 
function songs (songs = initialState.songs, action) {
    switch (action.type) {
        case ActionTypes.SET_SONGS:
            return action.songs
        case ActionTypes.REMOVE_SONG_FROM_LIST:
            return songs.filter(song => song.id !== action.id)
        default:
            return songs
    }
}
```
- containers
container 作为中间 将 state 和 action 处理后 作为 props 传入组件

store.dispatch()是 View 发出 Action 的唯一方法

```js
const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
    changeCurrentSong: (song) => {
        dispatch()
    }
})

// connect 将React组件连接到Redux存储, 返回一个新的，连接的组件类
// 把 state actions 变为 props 传入组件中
export default connect(mapStateToProps, mapDispatchToProps)(MiniPlayer)

```

## react-transition-group
> vue -> <transition>
