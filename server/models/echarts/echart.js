const theDatabase = require('../../config/db.js').theDb; //引入数据库

const echartSchema = theDatabase.import('../../schema/sample_detector_ground_info.js'); 
const radarSchema = theDatabase.import('../../schema/reference_info.js'); 
const referenceInfoSchema = theDatabase.import('../../schema/reference_info.js'); 
const unitInfoSchema = theDatabase.import('../../schema/unit_info.js'); 
 



const getReferenceInfo =  async function (element) {
   
    let referenceInfo
    if (element) {
        referenceInfo = await referenceInfoSchema.findAll({
                attributes: [element], 
            })
    }
    
    return referenceInfo
}

const getUnitInfo =  async function (element) {
    let unitInfo
    if (element){
        unitInfo = await unitInfoSchema.findAll({
            attributes: [element],
        })
    }
    
    return unitInfo
}

const getSelectOptions = async function (assess_type) {
    const SelectOptions = await echartSchema.findAll({
        attributes: {exclude: ['id','project_num','point_num','sample_depth','count']},
        where: {
            assess_type
        }
    })
    return SelectOptions
}

const getFoldElement = async function (project_numassess_type, element) {
    let AllElementData
    if (element) {
    
            AllElementData = await echartSchema.findAll({
                attributes: [element,'point_num','sample_depth','project_num'],
                where: {
                    project_num,
                    assess_type
                       
                }
            })
        
    }
    return AllElementData
}


const getElementData = async function(){
    const AllElementData = await echartSchema.findAll()
    return AllElementData
}



const getAllEchartData = async function(point_num){
    const AllEchartData = await echartSchema.findAll({
        where: {
            point_num: point_num
        }
    })
    return AllEchartData
}

const getAllRadarData = async function(reference_num){
    const AllDatarData = await radarSchema.findAll(
        {
            where: {
                reference_num: reference_num
            }
        }
    ) 
    return AllDatarData
}

const getFoldData = async function (point_num,assess_type) {
    const FoldData = await echartSchema.findAll({
        attributes: {exclude: ['id','project_num','count','remarks','date']},
        where: {
            point_num,
            assess_type
        }
    })
    return FoldData
}

const getHistogramElement = async function (point_num, element) {
    let AllElementData
    if (element) {
    
            AllElementData = await echartSchema.findAll({
                attributes: [element,'sample_depth','assess_type'],
                where: {
                    point_num,
          
                }
            })
        
    }
    return AllElementData
}


module.exports = {
    getAllEchartData,
    getAllRadarData,
    getElementData,
    getFoldData,
    getReferenceInfo,
    getUnitInfo,
    getSelectOptions,
    getFoldElement,
    getHistogramElement
    
}