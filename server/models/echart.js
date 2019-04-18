const theDatabase = require('../config/db.js').theDb; //引入数据库
// const echartSchema = theDatabase.import('../schema/element_info.js'); 
const projectInfoSchema = theDatabase.import('../schema/project_info.js'); 
const groundInfoSchema = theDatabase.import('../schema/ground_info.js'); 
const echartSchema = theDatabase.import('../schema/real_time_element.js'); 
const radarSchema = theDatabase.import('../schema/reference_info.js'); 

const getAllProjectData = async function(){
    const AllProjectData = await projectInfoSchema.findAll()
    return AllProjectData
}

const getElementData = async function(){
    const AllElementData = await echartSchema.findAll()
    return AllElementData
}

const getAllGroundData = async function(ground_num){
    const AllGroundtData = await groundInfoSchema.findAll({
        where:{
            ground_num: ground_num
        }
    })
    return AllGroundtData
}

const getAllEchartData = async function(point_num){
    const AllEchartData = await echartSchema.findAll({
        where: {
            point_num: point_num
        }
    })
    return AllEchartData
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
    getAllProjectData,
    getAllGroundData,
    getAllEchartData,
    getAllRadarData,
    getElementData
}