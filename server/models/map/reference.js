const theDatabase = require('../../config/db.js').theDb; //引入数据库

const ReferenceInfoSchema = theDatabase.import('../../schema/reference_info.js'); 


const getReferenceData = async function(){
    const data = await ReferenceInfoSchema.findOne()
    return data.dataValues
}


module.exports = {
    getReferenceData
}