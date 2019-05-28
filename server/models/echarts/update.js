const theDatabase = require('../../config/db.js').theDb; //引入数据库
const sample_histogram_statistic_value_Schema = theDatabase.import('../../schema/sample_ground_histogram_statistic_value.js'); 
const sample_type2_statistic_value_Schema = theDatabase.import('../../schema/sample_type2_ground_statistic_value.js'); 
const sample_water_histogram_statistic_value = theDatabase.import('../../schema/sample_water_histogram_statistic_value.js'); 
const sample_type2_water_statistic_value = theDatabase.import('../../schema/sample_type2_water_statistic_value.js'); 


const UpdateElementData = async function(statistic_value,point_num,assess_type,data){
    // console.log(111,typeof statistic_value,typeof point_num,assess_type,data)

        await sample_histogram_statistic_value_Schema.update(
            data
        ,{
             where:{
             statistic_value:statistic_value,
             point_num:point_num,
             assess_type:assess_type,
              }
         })
    
   
    return true
}

const UpdateWaterElementData = async function(statistic_value,point_num,assess_type,data){
    // console.log(111,typeof statistic_value,typeof point_num,assess_type,data)

        await sample_water_histogram_statistic_value.update(
            data
        ,{
             where:{
             statistic_value:statistic_value,
             point_num:point_num,
             assess_type:assess_type,
              }
         })
    
   
    return true
}


const UpdateType2ElementEachDepthData = async function(statistic_value,point_num,sample_depth,data){
    // console.log(111,statistic_value,point_num,sample_depth,data)
  
        await sample_type2_statistic_value_Schema.update(
            data
        ,{
             where:{
             statistic_value:statistic_value,
             point_num:point_num,
             sample_depth:sample_depth,
              }
         })
    
   
    return true
}

const UpdateType2WaterElementEachDepthData = async function(statistic_value,point_num,sample_depth,data){
    // console.log(111,statistic_value,point_num,sample_depth,data)
  
        await sample_type2_water_statistic_value.update(
            data
        ,{
             where:{
             statistic_value:statistic_value,
             point_num:point_num,
             sample_depth:sample_depth,
              }
         })
    
   
    return true
}



module.exports = {
  
    UpdateElementData,
    UpdateType2ElementEachDepthData,
    UpdateWaterElementData,
    UpdateType2WaterElementEachDepthData
    
 
}