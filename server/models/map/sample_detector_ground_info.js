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

const getAttentionByPointnum = async function(point_num){
    const list=new Set()
    const AllProjectData = await sample_detector_ground_info_Schema.findAll({
        where:{
            point_num: point_num
        }
    })
    
    for(let item of AllProjectData){
        
        
        list.add(item.attention)
    }
    return list
}

const getAlldata = async function(){
    const AllProjectData = await sample_detector_ground_info_Schema.findAll({
       
    })

    return AllProjectData
}


const UpdateCount = async function(id,sample_num,count){
    await sample_detector_ground_info_Schema.update({
        count:count,      
    },{
        where:{
            point_num:id,
            sample_num:sample_num,
        }
    })
    return true
}


const UpdateAttention = async function(sample_num,attention){
    await sample_detector_ground_info_Schema.update({
        attention:attention,      
    },{
        where:{
            
            sample_num:sample_num,
        }
    })
    return true
}

const AddNewData = async function(data){
    console.log("adddata",data)
    const result = await sample_detector_ground_info_Schema.create({
        sample_num: data.sample_num,
        assess_type: data.assess_type,
        point_num: data.point_num,
        project_num: data.project_num,
        date: data.date,
        sample_depth: data.sample_depth,
        PH: data.PH,
        arsenic: data.arsenic,
        cadmium: data.cadmium,
        chromium: data.chromium,
        copper: data.copper,
        lead: data.lead,
        mercury:data.mercury,
        nickel:data.nickel,
        antimony:data.antimony,
        beryllium:data.beryllium,
        cobalt:data.cobalt,
        zinc:data.zinc,
        silver:data.silver,
        thallium:data.thallium,
        tin:data.tin,
        selenium:data.selenium,
        molybdenum:data.molybdenum,
        Alum:data.Alum,
        remarks:data.remarks,
        lng:data.lng,
        log:data.log,
        count:data.count,
        attention:data.attention,
      })
      return result
      
}




const getmaxbyattention = async function(point_num,attention){

    const AllProjectData = await sample_detector_ground_info_Schema.findAll({
        where:{
            attention: attention,
            point_num:point_num
        }
    })

    // for(let item of AllProjectData){
        
        
    //     list.add(item.attention)
    // }
    return AllProjectData
}


module.exports = {
    getDataByPointnum,
    getAttentionByPointnum,
    getAlldata,
    UpdateCount,
    UpdateAttention,
    AddNewData,
    getmaxbyattention,

}