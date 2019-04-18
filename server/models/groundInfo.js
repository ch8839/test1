const theDatabase = require('../config/db.js').theDb; //引入数据库
const groundInfoSchema = theDatabase.import('../schema/ground_info.js');
const realTime_elementInfoSchema = theDatabase.import('../schema/real_time_element.js');
const elementInfoSchema = theDatabase.import('../schema/element_info.js');

const referenceInfoSchema = theDatabase.import('../schema/reference_info.js');
const unitInfoSchema = theDatabase.import('../schema/unit_info.js');

const getGroundMarkerList = async function (ground_num) {
   
    const markerList = await groundInfoSchema.findAll({
        where: {
            ground_num
        }
    })

    return markerList
}

const getReferenceInfo =  async function () {
   
    const referenceInfo = await referenceInfoSchema.findAll({
        attributes: {exclude: ['id']},
    })

    return referenceInfo
}

const getUnitInfo =  async function () {
   
    const unitInfo = await unitInfoSchema.findAll({
        attributes: {exclude: ['id']},
    })

    return unitInfo
}

const getAllGroundData = async function (ground_num, currentPage, page_size) {
    const AllGroundtData = await groundInfoSchema.findAndCountAll({
        limit: page_size,
        offset: (currentPage - 1) * page_size,
        where: {
            ground_num: ground_num
        }
    })

    return AllGroundtData
}

const getAllGroundData2 = async function (ground_num) {
    const AllGroundtData = await groundInfoSchema.findAll({
        where: {
            ground_num: ground_num
        }
    })
    return AllGroundtData
}

const getRealTimeElementData = async function (ground_num) {
    const TodayElementData = await realTime_elementInfoSchema.findAll({
        where: {
            ground_num: ground_num
        }
    })
    return TodayElementData
}

const getSelectOptions = async function (point_num, point_depth) {
    const SelectOptions = await elementInfoSchema.findAll({
        attributes: {exclude: ['id','ground_num','point_num','point_depth','date']},
        where: {
            point_num,
            point_depth
        }
    })
    return SelectOptions
}

const getAllHistory = async function (point_num, point_depth, fliter_element, fliter_date) {
    let AllHistoryData
    if (fliter_element.length && !fliter_element.includes("all")) {
        if (fliter_date.length) {
            AllHistoryData = await elementInfoSchema.findAll({
                attributes: ['date', ...fliter_element],
                where: {
                    point_num,
                    point_depth,
                    date: {
                        $lt: fliter_date[1],
                        $gt: fliter_date[0]
                    }
                }
            })
        } else {
            AllHistoryData = await elementInfoSchema.findAll({
                attributes: ['date', ...fliter_element],
                where: {
                    point_num,
                    point_depth
                }
            })
        }
    } else {
        if (fliter_date.length) {
            AllHistoryData = await elementInfoSchema.findAll({
                where: {
                    point_num,
                    point_depth,
                    date: {
                        $lt: fliter_date[1],
                        $gt: fliter_date[0]
                    }
                }
            })
        } else {
            AllHistoryData = await elementInfoSchema.findAll({
                where: {
                    point_num,
                    point_depth
                }
            })
        }
    }

    return AllHistoryData
}

module.exports = {
    getAllGroundData,
    getReferenceInfo,
    getUnitInfo,
    getGroundMarkerList,
    getSelectOptions,
    getRealTimeElementData,
    getAllHistory,
    getAllGroundData2

}