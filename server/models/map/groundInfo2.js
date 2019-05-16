const theDatabase = require('../../config/db.js').theDb; //引入数据库
const groundInfoSchema = theDatabase.import('../../schema/sample_detector_ground_info.js'); 

const referenceInfoSchema = theDatabase.import('../../schema/reference_info.js');
const unitInfoSchema = theDatabase.import('../../schema/unit_info.js');


//通过地块编号得到多个监测点编号信息
const getPointnumByGroundnum = async function(project_num){
    const i=new Set()
    var u={}
    const AllElementData = await groundInfoSchema.findAll(
    {
        where:{
            project_num: project_num
        }
    }
    )
    for(let item of AllElementData){
        //   console.log(item.point_num)
        
        
          i.add(item.point_num)
    
}
    // console.log(AllElementData.dataValues)
    u[project_num]=i;
    return u
}


const UpdateCount = async function(id,depth,count){
    await groundInfoSchema.update({
        count:count,
        
    },{
        where:{
            point_num:id,
            sample_depth:depth,
        }
    })
    return true
}

const getPoingLocationByGroundnum = async function(project_num){
    const AllSelectData = await groundInfoSchema.findAll({
        where:{
            project_num:project_num
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

const getReferenceInfo =  async function () {
   
    const referenceInfo = await referenceInfoSchema.findAll({
        attributes: {exclude: ['id']},
    })

    return referenceInfo
}

const getUnitInfo =  async function () {
   
    const unitInfo = await unitInfoSchema.findAll({
        attributes: {exclude: ['id']},
    })

    return unitInfo
}

const getAllGroundData = async function (project_num, currentPage, page_size) {
    const AllGroundtData = await groundInfoSchema.findAndCountAll({
        limit: page_size,
        offset: (currentPage - 1) * page_size,
        where: {
            project_num: project_num
        }
    })

    return AllGroundtData
}

const getRealTimeElementData = async function (project_num) {
    const TodayElementData = await groundInfoSchema.findAll({
        where: {
            project_num: project_num
        }
    })
    return TodayElementData
}

module.exports = {
    getPointnumByGroundnum,
    UpdateCount,
    getPoingLocationByGroundnum,
    getReferenceInfo,
    getUnitInfo,
    getAllGroundData,
    getRealTimeElementData,

}