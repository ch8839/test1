const theDatabase = require('../../config/db.js').theDb; //引入数据库
const sample_detector_ground_info_Schema = theDatabase.import('../../schema/sample_detector_ground_info.js'); 

const getDataByPointnum = async function(point_num){
    const AllProjectData = await sample_detector_ground_info_Schema.findAll({
        where:{
            point_num: point_num
        }
    })

    return AllProjectData
}


module.exports = {
    getDataByPointnum,
    

}