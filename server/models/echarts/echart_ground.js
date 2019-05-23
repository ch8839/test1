const theDatabase = require('../../config/db.js').theDb; //引入数据库

const echartSchema = theDatabase.import('../../schema/sample_lab_ground_info.js'); 
const radarSchema = theDatabase.import('../../schema/reference_info.js'); 
// const referenceInfoSchema = theDatabase.import('../../schema/reference_info.js'); 
// const unitInfoSchema = theDatabase.import('../../schema/unit_info.js'); 
const sample_histogram_statistic_value_Schema = theDatabase.import('../../schema/sample_ground_histogram_statistic_value.js'); 
const sample_type2_statistic_value_Schema = theDatabase.import('../../schema/sample_type2_ground_statistic_value.js'); 




// const getReferenceInfo =  async function (element) {
   
//     let referenceInfo
//     if (element) {
//         referenceInfo = await referenceInfoSchema.findAll({
//                 attributes: [element], 
//             })
//     }
    
//     return referenceInfo
// }

// const getUnitInfo =  async function (element) {
//     let unitInfo
//     if (element){
//         unitInfo = await unitInfoSchema.findAll({
//             attributes: [element],
//         })
//     }
    
//     return unitInfo
// }

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



// const getAllEchartData = async function(point_num){
//     const AllEchartData = await sample_histogram_statistic_value_Schema.findAll({
//         where: {
//             point_num: point_num
//         }
//     })
//     return AllEchartData
// }


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
        attributes: {exclude: ['id','project_num','sample_num','assess_type','count','remarks','date','attention','lat','lng']},
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


module.exports = {
    // getAllEchartData,
    getAllRadarData,
    getElementData,
    getFoldData,
    // getReferenceInfo,
    // getUnitInfo,
    RadarEachDepthValue,
    getHistogramElement,
    getType3ElementData,
    getData
    
}