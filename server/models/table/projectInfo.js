const db = require('../../config/db.js') //引入数据库
const Sequelize = db.theDb
const projectInfoSchema = Sequelize.import('../../schema/project_info.js');
const pointInfoSchema = Sequelize.import('../../schema/point_info.js');

class AllProjectDataModel {
    static async getAllProjectData() {
        const AllProjectData = await projectInfoSchema.findAll()
        return AllProjectData
    }

    static async getPoint(project_num) {
        const pointOptions = await pointInfoSchema.findAll({
            attributes: ['point_num'],
            where:{
                project_num
            }
        })
        return pointOptions
    }

    static async getPointMarkerList(project_num) {   
        const markerList = await pointInfoSchema.findAll({
            where: {
                project_num
            }
        })
        return markerList
    }
}

module.exports = AllProjectDataModel