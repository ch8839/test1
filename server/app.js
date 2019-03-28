const path = require('path')
const Koa =(require('koa'))
const router = require('koa-router')()
const userRoute = require('./routers/index.js')
const bodyparser = require('koa-bodyparser')
const cors = require('koa2-cors')
const json = require('koa-json')

const app = new Koa()

app.use(cors()) //use cors一定要挂载到路由之前
app.use(bodyparser()) //use bodyparser要挂载到路由之前
app.use(json())

app.use(async function (ctx, next) {
  try{
    await next()
  }catch(err){
    ctx.body={
      success:false
    }
    throw err
  }
})

router.use(userRoute.routes())
app.use(router.routes()) // 将路由规则挂载到Koa上。


app.listen(9098, () => {
    console.log('Koa is listening on port 9098');
  });

module.exports = app