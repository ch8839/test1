const db = require('../../config/db.js') //引入数据库
const Sequelize = db.theDb
const userInfoSchema = Sequelize.import('../../schema/user.js');

class UserModel {
    static async login(username) {
        const userInfo = await userInfoSchema.findOne({
            where:{
                username
            }
        })
        return userInfo
    }
}

module.exports = UserModel