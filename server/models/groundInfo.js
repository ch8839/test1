const theDatabase = require('../config/db.js').theDb; //引入数据库
const groundInfoSchema = theDatabase.import('../schema/ground_info.js'); 
const elementInfoSchema = theDatabase.import('../schema/element_info.js'); 


const getAllGroundData = async function(ground_num){
    const AllGroundtData = await groundInfoSchema.findAll({
        where:{
            ground_num: ground_num
        }
    })

    return AllGroundtData
}

const getElementData = async function(){
    const AllElementData = await elementInfoSchema.findAll()
    return AllElementData
}

const getAllHistory = async function(params){
    const AllHistoryData = await elementInfoSchema.findAll({
        where:{
            point_num:params
        }
    })
    return AllHistoryData
}

module.exports = {
    getAllGroundData,
    getElementData,
    getAllHistory

}