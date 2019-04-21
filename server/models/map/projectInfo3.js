const theDatabase = require('../../config/db.js').theDb; //引入数据库
const projectInfoSchema = theDatabase.import('../../schema/project_info.js'); 
const groundInfoSchema = theDatabase.import('../../schema/ground_info.js'); 
const locationphInfoSchema = theDatabase.import('../../schema/real_time_element.js'); 


const getPhData = async function(ground_number){
    const AllProjectData = await locationphInfoSchema.findAll({
        where:{
            point_num: ground_number
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

const UpdateCount = async function(id, count){
    await projectInfoSchema.update({
        count: count,
        
    },{
        where:{
            ground_num:id
        }
    })
    return true
}


module.exports = {
    getAllProjectData,
    getPhData,
    getDepthData, 
    UpdateCount

}