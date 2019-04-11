const theDatabase = require('../config/db.js').theDb; //引入数据库
const projectInfoSchema = theDatabase.import('../schema/project_info.js'); 
const groundInfoSchema = theDatabase.import('../schema/ground_info.js'); 

const locationphInfoSchema = theDatabase.import('../schema/location_ph.js'); 

const getNameByGroundNumber = async function(ground_number){
    const ground_name = await projectInfoSchema.findOne({
        where:{
            ground_num: ground_number
        }
    })

    return ground_name
}

const getLocationNumber = async function(ground_name){
    const AllProjectData = await projectInfoSchema.findAll({
        where:{
            ground_name: ground_name
        }
    })
    // console.log(AllProjectData)
    return AllProjectData
}

const getPhData = async function(ground_number){
    const AllProjectData = await locationphInfoSchema.findAll({
        where:{
            locaton_number: ground_number
        }
    })
    // console.log(AllProjectData)
    return AllProjectData
}

const getDepthData = async function(ground_number){
    const AllProjectData = await groundInfoSchema.findAll({
        where:{
            ground_num: ground_number
        }
    })
    // console.log(AllProjectData)
    return AllProjectData
}

const getAllProjectData = async function(){
    const AllProjectData = await projectInfoSchema.findAll()
    // console.log(AllProjectData)
    return AllProjectData
}

module.exports = {
    getAllProjectData,
    getLocationNumber,
    getPhData,
    getDepthData,
    getNameByGroundNumber

}