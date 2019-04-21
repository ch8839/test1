const db = require('../../config/db.js') //引入数据库
const Sequelize = db.theDb
const projectInfoSchema = Sequelize.import('../../schema/project_info.js');

class AllProjectDataModel {
    static async getAllProjectData() {
        const AllProjectData = await projectInfoSchema.findAll()
        return AllProjectData
    }
}

module.exports = AllProjectDataModel