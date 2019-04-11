const theDatabase = require('../config/db.js').theDb; //引入数据库
const echartSchema = theDatabase.import('../schema/element_info.js'); 

const getAllEchartData = async function(point_num){
    console.log(point_num)
    const AllEchartData = await echartSchema.findAll({
        where: {
            point_num: point_num
        }
    })
    return AllEchartData
}

module.exports = {
    getAllEchartData
}