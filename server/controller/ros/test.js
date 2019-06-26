
class RosTest_Controller {
  static async test_get(ctx) {
   let req = ctx.params
   console.log(req)
   ctx.body = {
     success: true,
     msg:'你好1'
   }
  }

  static async test_post(ctx) {
    let req = ctx.request.body
    console.log(req)
    ctx.body = {
      success: true,
      msg:'你好2'
    }
   }
}

module.exports = RosTest_Controller