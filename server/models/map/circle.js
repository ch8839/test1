const theDatabase = require('../../config/db.js').theDb; //引入数据库

const circle_area = theDatabase.import('../../schema/circle_area.js'); 

const getCircleByProjectnum = async function(project_num){
    data=[]
    const AllSelectData = await circle_area.findAll({
        where:{
            project_num:project_num
        }
    })
    let res = AllSelectData.map(item=>{
        return item = item.dataValues
      })
    console.log(res)
    for (let i of res){
      A=[i.lng,i.log]
      data.push(A)

    }
    return data
}





module.exports = {
    getCircleByProjectnum
}