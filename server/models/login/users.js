const theDatabase = require('../../config/db.js').theDb; //引入数据库
const userSchema = theDatabase.import('../../schema/user.js'); 
const studentInfo = theDatabase.import('../../schema/list2.js'); 

//把通过Pet.findAll()返回的一个或一组对象称为Model实例


const getStudentById = async function(id){
    const userInfo=await studentInfo.findOne({
        where:{
            number:id
        }
    })
    return userInfo
}

const findUserByName = async function(form){
    const userinfo = await userSchema.findOne({
        where:{
            username: form.username
        }
    })
    return userinfo
}
module.exports = {
    getStudentById,
    findUserByName

}