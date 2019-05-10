const path = require('path')
const Koa = require('koa')
const Router = require('koa-router')
const index = require('./routers/index.js')
const bodyparser = require('koa-bodyparser')
const cors = require('koa2-cors')
const json = require('koa-json')
const static = require('koa-static')
const jwt = require('jsonwebtoken')

const app = new Koa()
const router = new Router()
const secret = 'shu-project'

app.use(cors()) //use cors一定要挂载到路由之前
app.use(bodyparser()) //use bodyparser要挂载到路由之前
app.use(json())

app.use(async function (ctx, next) {
  try {
    let url = ctx.request.url
    // 登录 不用检查
    if (url == "/user2/login"){
      console.log("登陆路由")
      await next();
    }else {
      // 规定token写在header 的 'autohrization' 
      let token = ctx.request.headers['shu-token'];
      // 解码
      try{
        let payload = await jwt.verify(token, secret)
      } catch{
        ctx.body = {
          code: 50014,
          msg: 'token 已过期'
        }
      }  
      await next()   
    }
  } catch (err) {
    ctx.body = {
      success: false
    }
    throw err
  }
})



// router.get('/all', async function(ctx){
//   ctx.response.body = "hhhh"
// })
router.use(index.routes())
app.use(router.routes()) // 将路由规则挂载到Koa上。
app.use(static(
  path.join(__dirname, '../dist')
))

app.listen(9098, () => {
  console.log('Koa is listening on port 9098');
});

module.exports = app