const theDatabase = require('../config/db.js').theDb; //引入数据库
const projectInfoSchema = theDatabase.import('../schema/project_info.js'); 


const getAllProjectData = async function(){
    const AllProjectData = await projectInfoSchema.findAll()
    return AllProjectData
}


module.exports = {
    getAllProjectData
}