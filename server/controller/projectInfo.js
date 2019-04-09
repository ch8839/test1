const AllProjectDataModel = require('../models/projectInfo.js')

const getAll = async function () {
  let AllProjectData = await AllProjectDataModel.getAllProjectData()

  if (AllProjectData) {
    
    this.body = {
      success: true,
      res: AllProjectData,
      msg: '获取成功'
    }
  } else {
    this.body = {
      success: false,
      msg: '获取失败'
    }
  }
}


module.exports = {
  getAll
}
