const theDatabase = require('../../config/db.js').theDb; //引入数据库
const projectInfoSchema = theDatabase.import('../../schema/project_info.js'); 
const groundInfoSchema = theDatabase.import('../../schema/ground_info.js'); 
const locationphInfoSchema = theDatabase.import('../../schema/sample_detector_ground_info.js'); 


const getPhData = async function(ground_number){
    const AllProjectData = await locationphInfoSchema.findAll({
        where:{
            point_num: ground_number
        }
    })
    //  console.log(AllProjectData)
    return AllProjectData
}

const getDepthData = async function(ground_number){
    const AllProjectData = await groundInfoSchema.findAll({
        where:{
            ground_num: ground_number
        }
    })
    // console.log(AllProjectData)
    return AllProjectData
}

const getAllProjectData = async function(){
    const AllProjectData = await projectInfoSchema.findAll()
    // console.log(AllProjectData)
    return AllProjectData
}



const getProjecttypeByProjectnum = async function(project_num){
    const AllProjectData = await projectInfoSchema.findOne({
        where:{
            project_num: project_num
        }
    })
 
  
    
    return AllProjectData.project_type
}


const UpdatedifferentCount = async function(id,simple_count, detail_count,fixed_count,all_count){
    await projectInfoSchema.update({
        simple_count: simple_count,
        detail_count:detail_count,
        fixed_count:fixed_count,
        all_count:all_count,
        
    },{
        where:{
            project_num:id
        }
    })
    return true
}



const getCountByProjectnum = async function(project_num){
    const AllProjectData = await projectInfoSchema.findOne({
        where:{
            project_num: project_num
        }
    })
    var list={}
    list.simple_count=AllProjectData.simple_count
    list.detail_count=AllProjectData.detail_count
    list.fixed_count=AllProjectData.fixed_count
    list.all_count=AllProjectData.all_count

  
    
    return list
}

module.exports = {
    getAllProjectData,
    getPhData,
    getDepthData, 
    getProjecttypeByProjectnum,
    UpdatedifferentCount,
    getCountByProjectnum,

}