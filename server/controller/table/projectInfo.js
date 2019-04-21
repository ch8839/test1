const AllProjectDataModel = require('../../models/table/projectInfo.js')

class ProjectInfo_Controller {
  static async getAll(ctx) {
    let AllProjectData = await AllProjectDataModel.getAllProjectData()

    if (AllProjectData) {

      ctx.body = {
        success: true,
        res: AllProjectData,
        msg: '获取成功'
      }
    } else {
      ctx.body = {
        success: false,
        msg: '获取失败'
      }
    }
  }
}

module.exports = ProjectInfo_Controller
