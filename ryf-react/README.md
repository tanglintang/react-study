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

```js
    render () {
        return (
            <div>
                { this.state.username }' s last gist is <a href={ this.state.lastGistUrl }>here</a>
            </div>
        )
    }

    componentDidMount () {
        fetch(this.props.source)
        .then(data => data.json())
        .then(data => {
            console.log(data)
            const lastGist = data[0]
            this.setState({
                username: lastGist.owner.login,
                lastGist: lastGist.html_url
            })
        })
    }
```

```js
class App extends Component {

    render () {
        return (
            <div className="App">
                <UserGist source="https://api.github.com/users/octocat/gists" />
            </div>
        )
    }
}
```

## antd 框架使用
```js
// 对 react ui =》 阿里的 antd 部分引用
import { Table, Pagination, Input, Row, Button, Modal, Form } from 'antd'
import 'antd/dist/antd.css'
```
### Modal
```js
showModal (type) {
    this.setState({
        visible: true
    })
}
handleOk = (e) => {
    // console.log(e)
    this.setState({
        visible: false,
    })
}
    
handleCancel = (e) => {
    // console.log(e)
    this.setState({
        visible: false,
    })
}

<Modal title="添加用户" visible={ this.state.visible } onOk={ this.handleOk } onCancel={ this.handleCancel }>
```

### FormItem 表单域
- **formItemLayout**
> 表单域布局
```js
<FormItem label="用户" {...formItemLayout} hasFeedback>

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
    }
}
```

- **getFieldDecorator**
> getFieldDecorator进行表单(组件)内容onchange监听，rules判断

`const { getFieldDecorator } = this.props.form`

语法：
```js
{ 
    getFieldDecorator('name', {
        rules: [
            {
                required: true,
                message: 'Please input your username'
            }
        ]
    })
    ( <Input placeholder="usename" /> ) 
}
```

- **validateFieldsAndScroll**
> 表单校验并获取一组输入域的值与 Error，如果校验不通过的菜单域不在可见范围内，则自动滚动进可见范围

语法：
```js
this.props.form.validateFieldsAndScroll((err, value) => {
    console.log(err, value)
})
```

- **setFieldsValue**
> 设置一组输入控件的值，只能设置注册过的值，否则报错 `You cannot set field before registering it.`
```js
this.props.form.setFieldsValue({
    name: row.name,
    age: row.age,
    address: row.address,
})
```

- resetFields
> 重置一组输入控件的值
`this.props.form.resetFields()`


### Tabel
> 注意：在 Table 中，dataSource 和 columns 里的数据值都需要指定 key 值。对于 dataSource 默认将每列数据的 key 属性作为唯一的标识。
```js
    <Table dataSource={ this.state.users } columns={ this.columns } rowKey={ row => row.id } bordered pagination={false}/>
```
- dataSource
> 指定表格的数据源 dataSource 为一个数组。
```js
const dataSource = [{
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号'
}, 
{
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号'
}]
```
- columns
> 表格列的配置描述
```js
columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
    },
]
```

**jsx 注入**
> 表格内添加节点和事件
```js
{
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    render: (text, row) => {
            return (
        <div>
            <Button type="primary" onClick={() => { this.showModal('edit', row) }}>编辑</Button>
            <Button type="danger" style={{ marginLeft: 10 }} onClick={ () => this.removeRow(row) }>删除</Button>
        </div>
    )
}
```
- rowKey 唯一的 key 标识
```js
<Table dataSource={ this.state.users } columns={ this.columns } rowKey={ row => row.id } bordered pagination={false}/>
```

## 引入后端 Koa
> 全家桶： koa + koa-router + koa-cors

`server/app.js`

    全栈 FullStack
    react SPA 单页应用 端口 3000 用户界面
    koa 不要界面了 端口 3006 后端提供 api
    结合：前端做页面及路由，后端提供数据来源

**跨域**

    网站 A 和 网站 B 通信
    前端 3000--------后端 3006 通信


### 中间件 middleware
> 为一种或多种应用程序提供容器，同时为应用程序提供相关服务。web中间件用于提供系统软件和应用软件之间的连接，以便于软件各部件之间的沟通，其可以为一种或多种应用程序提供容器。
router、cors

### 引入 koa 路由
`const router = require('koa-router')()`

`app.use(router.routes())`

### cors 解决跨域问题

    localhost/:1 Failed to load http://localhost:3006/users: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:3000' is therefore not allowed access.

`yarn add koa-cors`

**配置**
```js
app.use(cors({
    origin: 'http://localhost:3000',
    exposeHeaders: ['WWW-Authenticate', 'Server-Authenticate'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST'],
    allHeaders: ['Content-Type', 'Authorization', 'Accept']
}))
```

### node 访问 mysql
`$ yarn add sequelize`
`$ yarn add mysql2`
`$ yarn add koa-body`

- ORM       
把关系数据库的表结构映射到对象上
> Node 的 ORM 框架 Sequelize, 读写的都是 JavaScript 对象

- 创建 sequelize 实例，配置
```js
const sequelize = new Sequelize('antd', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: true,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        timestamps: false,
    }
})
```