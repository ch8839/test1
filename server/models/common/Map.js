const theDatabase = require('../../config/db.js').theDb; //引入数据库
const referenceInfoSchema = theDatabase.import('../../schema/reference_info.js');
const unitInfoSchema = theDatabase.import('../../schema/unit_info.js');
const areaMapSchema = theDatabase.import('../../schema/area_map.js');

const getAllMap = async function () {

    let referenceInfo =  referenceInfoSchema.findAll({
        attributes: { exclude: ['id','point_num','reference_intro', 'type'] },
    }) //不同标准的参考值表
    let unitInfo =  unitInfoSchema.findAll({
        attributes: { exclude: ['id'] },
    })//单位和元素名称映射
    let areaInfo =  areaMapSchema.findAll({
        attributes: { exclude: ['id'] },
    })//区编号映射表

    let arr = await Promise.all([referenceInfo, unitInfo, areaInfo])
    let tasks = arr.map(item=>{
        return item.map(item2=>{
            return item2.dataValues
        })
    })
    // console.log(tasks)

    let reference_arr = tasks[0] //不同标准的参考值数组
    let unit_eleName_arr = tasks[1] //单位、元素映射
    let area_arr = tasks[2] //区

    let reference_17_ground_Obj = reference_arr[0] //参考值标准1
    let reference_17_water_Obj = reference_arr[2] //参考值标准2

    let unitObj = unit_eleName_arr[0] //单位映射
    let elementNameObj = unit_eleName_arr[1] //元素名称映射

    // let areaObj = area_arr[0] //区名映射

    let reference_17_ground_Map_arr = [],
        reference_17_water_Map_arr = [],
        element_Map_arr = [],
        unit_Map_arr = [],
        area_Map_arr = []

    for (let key in reference_17_ground_Obj) {
        reference_17_ground_Map_arr.push([key, reference_17_ground_Obj[key]])
    }
    for (let key in reference_17_water_Obj) {
        reference_17_water_Map_arr.push([key, reference_17_water_Obj[key]])
    }
    for (let key in elementNameObj) {
        element_Map_arr.push([key, elementNameObj[key]])
    }
    for (let key in unitObj) {
        unit_Map_arr.push([key, unitObj[key]])
    }
    for (let item of area_arr) {
        area_Map_arr.push([item['area_num'], item['area_name']])
    }


    return {
        reference_17_ground_Map: new Map(reference_17_ground_Map_arr),//拿到国标的标准值
        reference_17_water_Map: new Map(reference_17_water_Map_arr),//拿到国标的标准值
        element_Map: new Map(element_Map_arr),//拿到中英文映射
        unit_Map: new Map(unit_Map_arr),//拿到单位映射
        area_Map: new Map(area_Map_arr)


        // console.log(1,reference_Map)
        // console.log(2,element_Map)
        // console.log(3,unit_Map)
    }


}


module.exports = {
    getAllMap

}

