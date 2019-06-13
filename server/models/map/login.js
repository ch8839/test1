const db = require('../../config/db.js') //引入数据库
const Sequelize = db.theDb
const userInfoSchema = Sequelize.import('../../schema/user.js');

class UserModel {
    static async getProjectnumByUser(username) {
        const userInfo = await userInfoSchema.findOne({
            where:{
                username
            }
        })
        return userInfo.project_owner
    }
    static async getRolesByUser(username) {
        const userInfo = await userInfoSchema.findOne({
            where:{
                username
            }
        })
        return userInfo.roles
    }
}

module.exports = UserModel