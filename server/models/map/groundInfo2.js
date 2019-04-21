const theDatabase = require('../../config/db.js').theDb; //引入数据库
const groundInfoSchema = theDatabase.import('../../schema/ground_info.js'); 

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
    getPointnumByGroundnum,
    UpdateCount,
    getPoingLocationByGroundnum

}