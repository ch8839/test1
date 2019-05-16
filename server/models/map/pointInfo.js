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

const getpointMarkerInfo = async function(){
    const AllProjectData = await pointInfoSchema.findAll({
        
    })

    return AllProjectData
}



const getProjectnumByPointnum = async function(point_num){
    const AllProjectData = await pointInfoSchema.findOne({
        where:{
            point_num: point_num
        }
    })

    return AllProjectData.project_num
}


const getIntroByPointnum = async function(point_num){
    const AllProjectData = await pointInfoSchema.findOne({
        where:{
            point_num: point_num
        }
    })
    
    return AllProjectData.point_intro
}

const getPointnumByProjectnum = async function(Project_num){
    const AllProjectData = await pointInfoSchema.findAll({
        where:{
            Project_num: Project_num
        }
    })
    
    var list=[]
    for (let i of AllProjectData) {
       list.push(i.point_num)


    }
    return list
}



const UpdatedifferentCount = async function(id,all_count){
    await pointInfoSchema.update({
        
        count:all_count,
        
    },{
        where:{
            point_num:id
        }
    })
    return true
}


module.exports = {
    getAllData,
    getpointMarkerInfo,
    getProjectnumByPointnum,
    getIntroByPointnum,
    getPointnumByProjectnum,
    UpdatedifferentCount,
}