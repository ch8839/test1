const theDatabase = require('../config/db.js').theDb; //引入数据库
const groundInfoSchema = theDatabase.import('../schema/ground_info.js'); 
const elementInfoSchema = theDatabase.import('../schema/real_time_element.js'); 


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
//通过地块编号得到多个监测点编号信息
const getPointnumByGroundnum = async function(ground_num){
    let i=[]
    var u={}
    const AllElementData = await groundInfoSchema.findAll(
    {
        where:{
            ground_num: ground_num
        }
    }
    )
    for(let item of AllElementData){
        //   console.log(item.point_num)
          i.push(item.point_num)
    }
    // console.log(AllElementData.dataValues)
    u[ground_num]=i;
    return u
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

const UpdateCount = async function(id,depth,count){
    await groundInfoSchema.update({
        count:count,
        
    },{
        where:{
            point_num:id,
            point_depth:depth,
        }
    })
    return true
}

const getPoingLocationByGroundnum = async function(ground_num){
    const AllSelectData = await groundInfoSchema.findAll({
        where:{
            ground_num:ground_num
        }
    })
    console.log(AllSelectData)
    var locALL=[]
    for(let item of AllSelectData){
        
        var loc={}
        loc.point_lng=item.dataValues.point_lng
        loc.point_lat=item.dataValues.point_lat
        loc.point_num=item.dataValues.point_num
        locALL.push(loc)
    }
    
    return locALL
}


module.exports = {
    getAllGroundData,
    getElementData,
    getAllHistory,
    getAllGroundData2,
    getPointnumByGroundnum,
    UpdateCount,
    getPoingLocationByGroundnum

}