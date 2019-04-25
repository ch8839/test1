const AllWaterDataModel = require('../../models/table/waterInfo.js')

var reference_Map2
var element_Map2
var unit_Map2

const getReference2 = (async function () {
  let referenceInfo = await AllWaterDataModel.getReferenceInfo()
  let unitInfo = await AllWaterDataModel.getUnitInfo()

  let referenceList = referenceInfo.map(item => {
    return item = item.dataValues
  })
  let unitList = unitInfo.map(item => {
    return item = item.dataValues
  })

  let referenceObj = referenceList[1]
  let unitObj = unitList[0]
  let elementNameObj = unitList[1]

  let reference_Map_arr = []
  let element_Map_arr = []
  let unit_Map_arr = []

  for (let key in referenceObj) {
    reference_Map_arr.push([key, referenceObj[key]])
  }
  for (let key in elementNameObj) {
    element_Map_arr.push([key, elementNameObj[key]])
  }
  for (let key in unitObj) {
    unit_Map_arr.push([key, unitObj[key]])
  }

  reference_Map2 = new Map(reference_Map_arr)
  element_Map2 = new Map(element_Map_arr)
  unit_Map2 = new Map(unit_Map_arr)
})()


// const reference_Map = new Map([['PH', 7.0], ['arsenic', 6.68], ['cadmium', 0.07], ['chromium', 38], ['copper', 28], ['lead', 25.3]
//   , ['mercury', 0.312], ['nickel', 39], ['antimony', 0.19], ['beryllium', 2.94], ['cobalt', 12.6], ['zinc', 94.9], ['silver', 0.1], ['thallium', 8.05],
// ['tin', 1], ['selenium', 0.44], ['molybdenum', 5.69], ['Alum', 8.5]])

// const element_Map = new Map([['PH', 'PH值'], ['arsenic', '砷'], ['cadmium', '镉'], ['chromium', '铬'], ['copper', '铜'], ['lead', '铅']
//   , ['mercury', '汞'], ['nickel', '镍'], ['antimony', '锑'], ['beryllium', '铍'], ['cobalt', '钴'], ['zinc', '锌'], ['silver', '银'], ['thallium', '铊'],
// ['tin', '锡'], ['selenium', '硒'], ['molybdenum', '钼'], ['Alum', '矾']])
class WaterInfo_Controller {

  

  static async getLabWaterList(ctx) {
    let req = ctx.request.body
    console.log(req)
    let { selectedProject: project_num, selectedPoint: point_num, selectedAssessType: assess_type, currentPage, page_size } = req
    let res = await AllWaterDataModel.getLabWaterData(project_num, point_num, assess_type, currentPage, page_size)
    let res1 = res.rows
    let count = res.count
 
    let SelectLabWaterData = res1.map(item => {
      let labWater_obj = item.dataValues
      let temp_obj = {}
      let LabWaterData_arr = []
      for(let key in labWater_obj){
        if(reference_Map2.has(key)){
          if(labWater_obj[key] < reference_Map2.get(key)){
            LabWaterData_arr.push({
              element: key, 
              value: labWater_obj[key], 
              reference: reference_Map2.get(key), 
              ispollution: 0, 
              unit: unit_Map2.get(key), 
              time: labWater_obj.date
            })
          }else{
            LabWaterData_arr.push({
              element: key, 
              value: labWater_obj[key], 
              reference: reference_Map2.get(key), 
              ispollution: 1, 
              unit: unit_Map2.get(key), 
              time: labWater_obj.date
            })
          }
          temp_obj.labWater_element = LabWaterData_arr
        }else{
          temp_obj[key] = labWater_obj[key]
        }
      }
      return item =temp_obj
      
    })

    console.log('SelectLabWaterData', SelectLabWaterData)
    
    if (SelectLabWaterData) {

      ctx.body = {
        success: true,
        res: SelectLabWaterData,
        count: count,
        element_Map: Array.from(element_Map2), //似乎Map数据不能直接传递，要先转换为数组，前端再转换为Map
        msg: '获取成功'
      }
    } else {
      ctx.body = {
        success: true,
        res: [],
        count: 0,
        msg: '没有监测点位信息'
      }
    }
  }


  static async getDetWaterList(ctx) {
    let req = ctx.request.body
    console.log(req)
    let { selectedProject: project_num, selectedPoint: point_num, selectedAssessType: assess_type, currentPage, page_size } = req
    let res = await AllWaterDataModel.getDetWaterData(project_num, point_num, assess_type, currentPage, page_size)
    let res1 = res.rows
    let count = res.count
 
    let SelectDetWaterData = res1.map(item => {
      let detWater_obj = item.dataValues
      let temp_obj = {}
      let DetWaterData_arr = []
      for(let key in detWater_obj){
        if(reference_Map2.has(key)){
          if(detWater_obj[key] < reference_Map2.get(key)){
            DetWaterData_arr.push({
              element: key, 
              value: detWater_obj[key], 
              reference: reference_Map2.get(key), 
              ispollution: 0, 
              unit: unit_Map2.get(key), 
              time: detWater_obj.date
            })
          }else{
            DetWaterData_arr.push({
              element: key, 
              value: detWater_obj[key], 
              reference: reference_Map2.get(key), 
              ispollution: 1, 
              unit: unit_Map2.get(key), 
              time: detWater_obj.date
            })
          }
          temp_obj.detWater_element = DetWaterData_arr
        }else{
          temp_obj[key] = detWater_obj[key]
        }
      }
      return item =temp_obj
      
    })

    console.log('SelectDetWaterData', SelectDetWaterData)
    
    if (SelectDetWaterData) {
      ctx.body = {
        success: true,
        res: SelectDetWaterData,
        count: count,
        element_Map: Array.from(element_Map2), //似乎Map数据不能直接传递，要先转换为数组，前端再转换为Map
        msg: '获取成功'
      }
    } else {
      ctx.body = {
        success: true,
        res: [],
        count: 0,
        msg: '没有监测点位信息'
      }
    }
  }

  static async getLabWaterReference(ctx){
    let sample_num = ctx.params.sample_num
    let res = await AllWaterDataModel.getLabWaterRefData(sample_num)

    let ref_arr = []
    let lab_obj = res[0].dataValues
    let det_obj = res[1].dataValues
    for(let key in det_obj){
      if(reference_Map2.has(key)){
        ref_arr.push({
          element: key,
          value: det_obj[key],
          lab_reference: lab_obj[key], 
          difference: Math.pow(lab_obj[key] - det_obj[key] , 2).toFixed(3),
          unit: unit_Map2.get(key)
        })
      }
    }
    console.log('ref_arr', ref_arr)
    if (res) {
      ctx.body = {
        success: true,
        res: ref_arr,
        msg: '获取成功'
      }
    } else {
      ctx.body = {
        success: true,
        res: [],
        msg: '没有监测点位信息'
      }
    }
  }
}


module.exports = WaterInfo_Controller
