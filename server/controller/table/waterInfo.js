const AllWaterDataModel = require('../../models/table/waterInfo.js')
const AllMap = require('../../models/common/Map.js')

var reference_17_water_Map, element_Map2, unit_Map2

AllMap.then(data=>{
  reference_17_water_Map = data.reference_17_water_Map
  element_Map2 = data.element_Map
  unit_Map2 = data.unit_Map
})


class WaterInfo_Controller {

  static async getLabWaterList(ctx) {
    let req = ctx.request.body

    let { selectedProject: project_num, selectedPoint: point_num, selectedAssessType: assess_type, currentPage, page_size } = req
    let res = await AllWaterDataModel.getLabWaterData(project_num, point_num, assess_type, currentPage, page_size)
    let res1 = res.rows
    let count = res.count
 
    let SelectLabWaterData = res1.map(item => {
      let labWater_obj = item.dataValues
      let temp_obj = {}
      let LabWaterData_arr = []
      for(let key in labWater_obj){
        if(reference_17_water_Map.has(key)){
          if(labWater_obj[key] < reference_17_water_Map.get(key)){
            LabWaterData_arr.push({
              element: key, 
              value: labWater_obj[key], 
              reference: reference_17_water_Map.get(key), 
              ispollution: 0, 
              unit: unit_Map2.get(key), 
              time: labWater_obj.date
            })
          }else{
            LabWaterData_arr.push({
              element: key, 
              value: labWater_obj[key], 
              reference: reference_17_water_Map.get(key), 
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

    // console.log('SelectLabWaterData', SelectLabWaterData)
    
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

    let { selectedProject: project_num, selectedPoint: point_num, selectedAssessType: assess_type, currentPage, page_size } = req
    let res = await AllWaterDataModel.getDetWaterData(project_num, point_num, assess_type, currentPage, page_size)
    let res1 = res.rows
    let count = res.count
 
    let SelectDetWaterData = res1.map(item => {
      let detWater_obj = item.dataValues
      let temp_obj = {}
      let DetWaterData_arr = []
      for(let key in detWater_obj){
        if(reference_17_water_Map.has(key)){
          if(detWater_obj[key] < reference_17_water_Map.get(key)){
            DetWaterData_arr.push({
              element: key, 
              value: detWater_obj[key], 
              reference: reference_17_water_Map.get(key), 
              ispollution: 0, 
              unit: unit_Map2.get(key), 
              time: detWater_obj.date
            })
          }else{
            DetWaterData_arr.push({
              element: key, 
              value: detWater_obj[key], 
              reference: reference_17_water_Map.get(key), 
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

    // console.log('SelectDetWaterData', SelectDetWaterData)
    
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
    let det_obj = res[1].dataValues

    if(res[0]){
      let lab_obj = res[0].dataValues    
      for(let key in det_obj){
        if(reference_17_water_Map.has(key)){
          ref_arr.push({
            element: key,
            value: det_obj[key],
            lab_reference: lab_obj[key], 
            difference: Math.pow(lab_obj[key] - det_obj[key] , 2).toFixed(3),
            unit: unit_Map2.get(key)
          })
        }
      }
    }else{
      for(let key in det_obj){
        if(reference_17_water_Map.has(key)){
          ref_arr.push({
            element: key,
            value: det_obj[key],
            lab_reference: '-1', 
            difference: '-/',
            unit: unit_Map2.get(key)
          })
        }
      }
    }
    // console.log('ref_arr', ref_arr)
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
