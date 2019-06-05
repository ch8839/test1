const theDatabase = require('../../config/db.js').theDb; //引入数据库
const pointInfoSchema = theDatabase.import('../../schema/point_info.js');
const sample_detector_ground_info_Schema = theDatabase.import('../../schema/sample_lab_ground_info.js');
const sample_lab_water_info_Schema = theDatabase.import('../../schema/sample_lab_water_info.js');

class Echart_0_Model {
    static async getAllAssessTypeData(project_num) {
        const AllProjectData = await sample_detector_ground_info_Schema.findAll({
            where: {
                project_num: project_num
            }
        })
        return AllProjectData
    }

    /* 获取指定项目体ground的所有样本 */
    static async getAllTableItemData(project_num) {
        const AllTableItemsData = await sample_detector_ground_info_Schema.findAll({
            where: {
                project_num: project_num
            }
        })
        return AllTableItemsData
    }

    /* 获取指定项目体water的所有样本 */
    static async getAllWaterTableItemData(project_num) {
        const AllTableItemsData = await sample_lab_water_info_Schema.findAll({
            where: {
                project_num: project_num
            }
        })
        return AllTableItemsData
    }

    /* 获取指定监测点位的点位描述 */
    static async getSpecifiedPointIntro() {
        const SpecifiedPointIntro = await pointInfoSchema.findAll()
        return SpecifiedPointIntro
    }

    static async getAlldata() {
        const AllProjectData = await sample_detector_ground_info_Schema.findAll({

        })
        return AllProjectData
    }

    static async getAllWaterData() {
        const AllProjectData = await sample_lab_water_info_Schema.findAll({
        })
        return AllProjectData
    }

    static async UpdateAttention(sample_num, attention) {
        await sample_detector_ground_info_Schema.update({
            attention: attention,
        }, {
                where: {
                    sample_num: sample_num,
                }
            })
        return true
    }

    static async UpdateWaterAttention(sample_num, attention) {
        await sample_lab_water_info_Schema.update({
            attention: attention,
        }, {
                where: {
                    sample_num: sample_num,
                }
            })
        return true
    }

}
module.exports = Echart_0_Model