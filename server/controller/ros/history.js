const RosHistoryModel = require('../../models/ros/history.js')

class RosHistory_Controller {

  static async getHistoryData(ctx) {
    let request = ctx.request.body
    console.log('rosrequest', request)
    let res = await RosHistoryModel.historyList()
    
    if (userList) {
      ctx.body = {
        success: true,
        res: userList,
        msg: '获取成功'
      }
    } else {
      ctx.body = {
        success: false,
        res: '',
        msg: '获取失败'
      }
    }
  }
}

module.exports = RosHistory_Controller