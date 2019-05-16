const theDatabase = require('../../config/db.js').theDb; //引入数据库
// const echartSchema = theDatabase.import('../schema/element_info.js'); 
const projectInfoSchema = theDatabase.import('../../schema/project_info.js'); 

const pointInfoSchema = theDatabase.import('../../schema/point_info.js'); 

const radarSchema = theDatabase.import('../../schema/reference_info.js'); 
const tableSchema = theDatabase.import('../../schema/sample_lab_ground_info.js'); 
const sample_groundInfoSchema = theDatabase.import('../../schema/sample_detector_ground_info.js'); 

const getAllProjectData = async function(){
    const AllProjectData = await projectInfoSchema.findAll()
    return AllProjectData
}

const getAllAssessTypeData = async function(project_num){
    const AllProjectData = await sample_groundInfoSchema.findAll({
        where:{
            project_num: project_num
        }
    })
    return AllProjectData
}

/* 获取指定项目体的所有样本 */
const getAllTableItemData = async function(project_num){
    const AllTableItemsData = await sample_groundInfoSchema.findAll({
        where:{
            project_num: project_num
        }
    })
    return AllTableItemsData
}

/* 获取指定监测点位的点位描述 */
const getSpecifiedPointIntro = async function(){
    const SpecifiedPointIntro = await pointInfoSchema.findAll()
    return SpecifiedPointIntro
}

/* 获取Bar图的有效元素 */
const getAllValidElement = async function(point_num, assess_type){
    const AllValidElement = await sample_groundInfoSchema.findAll({
        where:{
            point_num: point_num,
            assess_type: assess_type
        }
    })
    return AllValidElement
}



const getAllRadarData = async function(id){
    const AllDatarData = await radarSchema.findAll(
        {
            where: {
                id: id
            }
        }
    ) 
    return AllDatarData
}

module.exports = {
    

    getAllRadarData,

    getAllValidElement,
    /* 引用的函数 */
    getAllProjectData,
    getAllAssessTypeData,
    getAllTableItemData,
    getSpecifiedPointIntro
}