const theDatabase = require('../../config/db.js').theDb; //引入数据库
const pointInfoSchema = theDatabase.import('../../schema/point_info.js'); 


const getAllData = async function(project_num){
    const AllProjectData = await pointInfoSchema.findAll({
        where:{
            project_num: project_num
        }
    })

    return AllProjectData
}

module.exports = {
    getAllData,
}