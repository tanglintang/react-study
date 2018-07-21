const router = require('koa-router')()
const koaBody = require('koa-body')
const User = require('../model/user')

// 中间件
router.get('/', async(ctx) => {
    ctx.body = '首页'
})

router.get('/users', async (ctx) => {
    const users = await User.findAll({
      where: {
        isdelete: 0
      }
    })
    ctx.body = users
  })
  

router.post('/user', koaBody(), async(ctx) => {
    // 拿到前端传来的数据
    // console.log(ctx.request.body)x
    // 通过 build 将对象变为模型 并保存
    const user = await User.build(ctx.request.body).save()

    ctx.body = user
})

module.exports = router