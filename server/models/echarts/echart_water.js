const theDatabase = require('../../config/db.js').theDb; //引入数据库
const radar_threshold_Schema = theDatabase.import('../../schema/reference_info.js'); 
const echartWaterSchema = theDatabase.import('../../schema/sample_lab_water_info.js'); 

const sample_water_histogram_statistic_value_Schema = theDatabase.import('../../schema/sample_water_histogram_statistic_value.js'); 
const sample_type2_water_statistic_value_Schema = theDatabase.import('../../schema/sample_type2_water_statistic_value.js'); 

const getWaterElementData = async function(assess_type){
    const AllElementData = await echartWaterSchema.findAll(
        {
            attributes: {exclude: ['id','sample_num','project_num','date','sample_depth','count','lat','lng']},
            where: {
                assess_type
            }
        }
    )
    return AllElementData
}

const getWaterData = async function (sample_depth,assess_type) {
    const FoldData = await echartWaterSchema.findAll({
        attributes: {exclude: ['id','project_num','count','remarks','date']},
        where: {
            sample_depth,
            assess_type
        }
    })
    return FoldData
}

const getWaterHistogramElement = async function (point_num, element) {
    let AllElementData
    if (element) {
    
            AllElementData = await sample_water_histogram_statistic_value_Schema.findAll({
                attributes: [element,'assess_type','statistic_value'],
                where: {
                    point_num,
          
                }
            })
        
    }
    return AllElementData
}

const getRadartype1WaterElementDepthData = async function (point_num,assess_type) {
    const FoldData = await echartWaterSchema.findAll({
        attributes: {exclude: ['id','project_num','sample_num','assess_type','point_num','count','attention','remarks','date']},
        where: {
            point_num,
            assess_type
        }
    })
    return FoldData
}

const RadarType2EachDepthValue = async function (point_num) {
    const SelectOptions = await sample_type2_water_statistic_value_Schema.findAll({
        attributes: {exclude: ['assess_type','id','remarks']},
        where: {
            point_num
        }
    })
    return SelectOptions
}

const getWaterRadarThresholdData = async function(reference_num,type){
    const AllDatarData = await radar_threshold_Schema.findAll(
        {
            attributes: {exclude: ['type','id','reference_num','point_num']},
            where: {
                reference_num,
                type,
            }
        }
    ) 
    return AllDatarData
}












module.exports = {
    getWaterElementData,
    getWaterData,
    getRadartype1WaterElementDepthData,
    getWaterHistogramElement,
    RadarType2EachDepthValue,
    getWaterRadarThresholdData
    
}