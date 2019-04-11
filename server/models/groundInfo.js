const theDatabase = require('../config/db.js').theDb; //引入数据库
const groundInfoSchema = theDatabase.import('../schema/ground_info.js'); 
const elementInfoSchema = theDatabase.import('../schema/element_info.js'); 


const getAllGroundData = async function(ground_num, currentPage, page_size){
    console.log('currentPage',currentPage)
    console.log('page_size',page_size)
    const AllGroundtData = await groundInfoSchema.findAndCountAll({
        limit: page_size,
        offset: (currentPage-1) * page_size,
        where:{
            ground_num: ground_num
        }
    })

    return AllGroundtData
}

const getAllGroundData2 = async function(ground_num){
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
    getAllHistory,
    getAllGroundData2

}