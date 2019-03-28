const theDatabase = require('../config/db.js').theDb; //引入数据库
const mapSchema = theDatabase.import('../schema/markers.js'); 
const tableSchema = theDatabase.import('../schema/tabledata_shu.js');

//把通过Pet.findAll()返回的一个或一组对象称为Model实例
const getAllMarkerInfo = async function(name){
    const markerInfo=await mapSchema.findAll()
    return markerInfo
}

const getAllTableData = async function(){
    const tableData=await tableSchema.findAll()
    return tableData
}

const updateTable = async function(id, data){
    await tableSchema.update({
        address: data.address,
        date: data.date,
        equipmentType: data.equipmentType,
        place: data.place,
        status: data.status,
    },{
        where:{
            id
        }
    })
    return true
}

const deleteData = async function(id){
    const result = await tableSchema.destroy({
        where: {
          id:id
        }
      })
    return result===1
}

const addData = async function(data){
    console.log("adddata",data)
    const result = await tableSchema.create({
        DSNUM: data.DSNUM,
        address: data.address,
        date: data.date,
        equipmentType: data.equipmentType,
        place: data.place,
        status: data.status,
      })
      return result
      
}
module.exports = {
    getAllMarkerInfo,
    getAllTableData,
    updateTable,
    deleteData,
    addData
}