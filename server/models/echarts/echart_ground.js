const theDatabase = require('../../config/db.js').theDb; //引入数据库

const echartSchema = theDatabase.import('../../schema/sample_lab_ground_info.js'); 
const radarSchema = theDatabase.import('../../schema/reference_info.js'); 
const sample_histogram_statistic_value_Schema = theDatabase.import('../../schema/sample_ground_histogram_statistic_value.js'); 
const sample_type2_statistic_value_Schema = theDatabase.import('../../schema/sample_type2_ground_statistic_value.js'); 


const RadarEachDepthValue = async function (assess_type,point_num) {
    const SelectOptions = await sample_type2_statistic_value_Schema.findAll({
        attributes: {exclude: ['assess_type','id','point_num','remarks']},
        where: {
            assess_type,
            point_num,
           
        }
    })
    return SelectOptions
}




const getElementData = async function(assess_type){
    const AllElementData = await echartSchema.findAll(
        {
            attributes: {exclude: ['id','sample_num','project_num','date','sample_depth','count','lat','lng']},
            where: {
                assess_type
            }
        }
    )
    return AllElementData
}

const getType3ElementData = async function(assess_type){
    const AllElementData = await echartSchema.findAll(
        {
            attributes: {exclude: ['id','sample_num','project_num','date','sample_depth','count','lat','lng']},
            where: {
                assess_type
            }
        }
    )
    return AllElementData
}

const getFoldElement = async function (point_num,assess_type,element) {
    let AllElementData
    if (element) {
    
            AllElementData = await echartSchema.findAll({
                attributes: [element,'sample_num','sample_depth'],
                where: {
                    point_num,
                    assess_type,
          
                }
            })
        
    }
    return AllElementData
}





const getAllRadarData = async function(type){
    const AllDatarData = await radarSchema.findAll(
        {
            attributes: {exclude: ['id','type','point_num']},
            where: {
                type,
              
            }
        }
    ) 
    return AllDatarData
}

const getFoldData = async function (sample_depth,assess_type) {
    const FoldData = await echartSchema.findAll({
        attributes: {exclude: ['id','project_num','sample_num','assess_type','count','remarks','date','attention','lat','lng']},
        where: {
            sample_depth,
            assess_type,
        }
    })
    return FoldData
}

const getData = async function (point_num,assess_type) {
    const FoldData = await echartSchema.findAll({
        attributes: {exclude: ['id','project_num','sample_num','assess_type','count','remarks','date','attention','point_num','lat','lng']},
        where: {
            point_num,
            assess_type,
        }
    })
    return FoldData
}

const getHistogramElement = async function (point_num, element) {
    let AllElementData
    if (element) {
    
            AllElementData = await sample_histogram_statistic_value_Schema.findAll({
                attributes: [element,'assess_type','statistic_value'],
                where: {
                    point_num,
          
                }
            })
        
    }
    return AllElementData
}

const getFoldElementMean = async function (point_num,assess_type,element,statistic_value) {
    let AllElementData
    if (element) {
    
            AllElementData = await sample_histogram_statistic_value_Schema.findAll({
                attributes: [element,],
                where: {
                    point_num,
                    assess_type,
                    statistic_value,
          
                }
            })
        
    }
    return AllElementData
}


module.exports = {
    
    getAllRadarData,
    getElementData,
    getFoldData,
    RadarEachDepthValue,
    getHistogramElement,
    getType3ElementData,
    getData,
    getFoldElement,
    getFoldElementMean
    
}