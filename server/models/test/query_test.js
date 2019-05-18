const theDatabase = require('../../config/db.js').theDb; //引入数据库
const sample_lab_water_InfoSchema = theDatabase.import('../../schema/sample_lab_water_info.js');

let getAllHistory = async function(point_num){
    const AllHistoryData = await sample_lab_water_InfoSchema.findAll({
        attributes: ['PH', 'arsenic','date'],   
        where:{
            point_num:point_num,
            PH: {
                $or: {
                  $lt: 6,
                  $eq: null
                }
              }
        }
    })
    return AllHistoryData
}

let res = async function(){
     let list = await getAllHistory('31010720190001001')
     let History_arr = list.map(item=>{
         
        return item = item.dataValues
    })
     console.log(History_arr)
}

res()
