const Router = require('koa-router')
const router = new Router()
const testController = require('../models/test')

router.get('/test1',async(ctx)=>{
    let res = await testController.fun1()
    console.log(res)
    ctx.body = res
})

module.exports = router