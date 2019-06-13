const db = require('../../config/db.js') //引入数据库
const Sequelize = db.theDb
const userInfoSchema = Sequelize.import('../../schema/user.js');
const projectInfoSchema = Sequelize.import('../../schema/project_info.js')

class UserManageModel {
  static async getUserList() {
    const userList = await userInfoSchema.findAll()
    return userList
  }

  static async getProjectList() {
    const projectList = await projectInfoSchema.findAll({
      attributes: ['project_name', 'project_num'],
    })
    return projectList
  }


  static async addUser(data) {
    const handleAddUser = await userInfoSchema.create(data)
    return handleAddUser
  }


  static async updateUser(id, data) {
    const handleUpdateUser = await userInfoSchema.update(data, {
      where: {
        id
      }
    })
    return handleUpdateUser
  }

  static async deleteUser(id) {
    await userInfoSchema.destroy({
      where: {
        id
      }
    })
    return true
  }
}

module.exports = UserManageModel