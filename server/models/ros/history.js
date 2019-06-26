const db = require('../../config/db.js') //引入数据库
const Sequelize = db.theDb
const historySchema = Sequelize.import('../../schema/history_data.js')

class RosHistoryModel {
  static async getUserList() {
    const historyList = await historySchema.findAll()
    return historyList
  }
}

module.exports = RosHistoryModel