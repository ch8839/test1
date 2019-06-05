const db = require('../../config/db.js') //引入数据库
const Sequelize = db.theDb
const sample_lab_ground_InfoSchema = Sequelize.import('../../schema/sample_lab_ground_info.js');
const sample_lab_water_InfoSchema = Sequelize.import('../../schema/sample_lab_water_info.js');

class ExcelDataUpload {
  static async upload(data, database_type) {
    if (database_type == 1) {
      for (let value of data) {
        await sample_lab_ground_InfoSchema.create(value)
      }
    } else {
      for (let value of data) {
        await sample_lab_water_InfoSchema.create(value)
      }
    }
    return true
  }
}

module.exports = ExcelDataUpload