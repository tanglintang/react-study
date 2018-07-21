const Koa = require('koa')
const cors = require('koa-cors')
const router = require('./routers/index')
const app = new Koa()

app.use(cors({
    origin: 'http://localhost:3000',
    exposeHeaders: ['WWW-Authenticate', 'Server-Authenticate'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST'],
    allowHeaders: ['Content=Type', 'Authorization', 'Accept']
}))
app.use(router.routes())
app.listen(3006)

// main 中间件 middleware
// ctx => context 上下文环境 => req + resp
// const main = ctx => {
//     ctx.response.body = 'hello world'
// }

// app.use(main)


console.log('app start at port 3006...')