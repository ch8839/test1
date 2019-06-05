const ExcelDataUpload = require('../../models/table/uploadExcel.js')

class excel_Controller {
  static async uploadExcel(ctx) {
    let { data, database_type } = ctx.request.body
    console.log(data)
    console.log(database_type)
    data.map(item => {
      return item.id = null
    })
    let res = await ExcelDataUpload.upload(data, database_type)

    if (res) {
      ctx.body = {
        msg: '导入成功'
      }
    } else {
      ctx.body = {
        msg: '导入失败'
      }
    }

  }
}

module.exports = excel_Controller