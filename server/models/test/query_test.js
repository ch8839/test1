const theDatabase = require('../../config/db.js').theDb; //引入数据库
const groundInfoSchema = theDatabase.import('../../schema/ground_info.js'); 
const elementInfoSchema = theDatabase.import('../../schema/element_info.js'); 

let getAllHistory = async function(point_num){
    const AllHistoryData = await elementInfoSchema.findAll({
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
