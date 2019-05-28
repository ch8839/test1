const theDatabase = require('../../config/db.js').theDb; //引入数据库
const sample_lab_ground_InfoSchema = theDatabase.import('../../schema/sample_lab_ground_info.js');
const sample_det_ground_InfoSchema = theDatabase.import('../../schema/sample_detector_ground_info.js');

const referenceInfoSchema = theDatabase.import('../../schema/reference_info.js');
const unitInfoSchema = theDatabase.import('../../schema/unit_info.js');

class AllGroundDataModel {

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

static async getLabGroundData(project_num, point_num, assess_type, currentPage, page_size) {
    let labGroundData
    if (point_num !== '0') {
        if (assess_type) {
            labGroundData = await sample_lab_ground_InfoSchema.findAndCountAll({
                limit: page_size,
                offset: (currentPage - 1) * page_size,
                where: {
                    project_num,
                    point_num,
                    assess_type
                }
            })
        } else {
            labGroundData = await sample_lab_ground_InfoSchema.findAndCountAll({
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
            labGroundData = await sample_lab_ground_InfoSchema.findAndCountAll({
                limit: page_size,
                offset: (currentPage - 1) * page_size,
                where: {
                    project_num,
                    assess_type                   
                }
            })
        } else {
            labGroundData = await sample_lab_ground_InfoSchema.findAndCountAll({
                limit: page_size,
                offset: (currentPage - 1) * page_size,
                where: {
                    project_num
                }
            })
        }
    }

    return labGroundData
}

static async getDetGroundData(project_num, point_num, assess_type, currentPage, page_size) {
    let detGroundData
    if (point_num !== '0') {
        if (assess_type) {
            detGroundData = await sample_det_ground_InfoSchema.findAndCountAll({
                limit: page_size,
                offset: (currentPage - 1) * page_size,
                where: {
                    project_num,
                    point_num,
                    assess_type
                }
            })
        } else {
            detGroundData = await sample_det_ground_InfoSchema.findAndCountAll({
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
            detGroundData = await sample_det_ground_InfoSchema.findAndCountAll({
                limit: page_size,
                offset: (currentPage - 1) * page_size,
                where: {
                    project_num,
                    assess_type                   
                }
            })
        } else {
            detGroundData = await sample_det_ground_InfoSchema.findAndCountAll({
                limit: page_size,
                offset: (currentPage - 1) * page_size,
                where: {
                    project_num
                }
            })
        }
    }

    return detGroundData
}

static async getLabGroundRefData(sample_num){
    const labGroundRef_Data = await sample_lab_ground_InfoSchema.findOne({
        where: {
            sample_num
        }
    })

    const detGroundData = await sample_det_ground_InfoSchema.findOne({
        where: {
            sample_num
        }
    })

    return [labGroundRef_Data , detGroundData]
}
}
module.exports = AllGroundDataModel