const theDatabase = require('../config/db.js').theDb; //引入数据库

const echartSchema = theDatabase.import('../schema/real_time_element.js'); 

const UpdateCount = async function(id,depth,count){
    await echartSchema.update({
        count:count,
        
    },{
        where:{
            point_num:id,
            point_depth:depth,
        }
    })
    return true
}





module.exports = {
    UpdateCount

}