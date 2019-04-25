const theDatabase = require('../../config/db.js').theDb; //引入数据库
const sample_lab_water_InfoSchema = theDatabase.import('../../schema/sample_lab_water_info.js');
const sample_det_water_InfoSchema = theDatabase.import('../../schema/sample_detector_water_info.js');

const referenceInfoSchema = theDatabase.import('../../schema/reference_info.js');
const unitInfoSchema = theDatabase.import('../../schema/unit_info.js');

class AllWaterDataModel {

    static async getReferenceInfo() {
   
    const referenceInfo = await referenceInfoSchema.findAll({
        attributes: {exclude: ['id']},
    })

    return referenceInfo
}

static async getUnitInfo() {
   
    const unitInfo = await unitInfoSchema.findAll({
        attributes: {exclude: ['id']},
    })

    return unitInfo
}

static async getLabWaterData(project_num, point_num, assess_type, currentPage, page_size) {
    let labWaterData
    if (point_num !== '0') {
        if (assess_type) {
            labWaterData = await sample_lab_water_InfoSchema.findAndCountAll({
                limit: page_size,
                offset: (currentPage - 1) * page_size,
                where: {
                    project_num,
                    point_num,
                    assess_type
                }
            })
        } else {
            labWaterData = await sample_lab_water_InfoSchema.findAndCountAll({
                limit: page_size,
                offset: (currentPage - 1) * page_size,
                where: {
                    project_num,
                    point_num
                }
            })
        }
    } else {
        if (assess_type) {
            labWaterData = await sample_lab_water_InfoSchema.findAndCountAll({
                limit: page_size,
                offset: (currentPage - 1) * page_size,
                where: {
                    project_num,
                    assess_type                   
                }
            })
        } else {
            labWaterData = await sample_lab_water_InfoSchema.findAndCountAll({
                limit: page_size,
                offset: (currentPage - 1) * page_size,
                where: {
                    project_num
                }
            })
        }
    }

    return labWaterData
}

static async getDetWaterData(project_num, point_num, assess_type, currentPage, page_size) {
    let detWaterData
    if (point_num !== '0') {
        if (assess_type) {
            detWaterData = await sample_det_water_InfoSchema.findAndCountAll({
                limit: page_size,
                offset: (currentPage - 1) * page_size,
                where: {
                    project_num,
                    point_num,
                    assess_type
                }
            })
        } else {
            detWaterData = await sample_det_water_InfoSchema.findAndCountAll({
                limit: page_size,
                offset: (currentPage - 1) * page_size,
                where: {
                    project_num,
                    point_num
                }
            })
        }
    } else {
        if (assess_type) {
            detWaterData = await sample_det_water_InfoSchema.findAndCountAll({
                limit: page_size,
                offset: (currentPage - 1) * page_size,
                where: {
                    project_num,
                    assess_type                   
                }
            })
        } else {
            detWaterData = await sample_det_water_InfoSchema.findAndCountAll({
                limit: page_size,
                offset: (currentPage - 1) * page_size,
                where: {
                    project_num
                }
            })
        }
    }

    return detWaterData
}

static async getLabWaterRefData(sample_num){
    const labWaterRef_Data = await sample_lab_water_InfoSchema.findOne({
        where: {
            sample_num
        }
    })

    const detWaterData = await sample_det_water_InfoSchema.findOne({
        where: {
            sample_num
        }
    })

    return [labWaterRef_Data , detWaterData]
}
}
module.exports = AllWaterDataModel