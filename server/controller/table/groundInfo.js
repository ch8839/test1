const AllGroundDataModel = require('../../models/table/groundInfo.js')
const AllMap = require('../../models/common/Map.js')

var reference_17_ground_Map, element_Map, unit_Map

AllMap.then(data=>{
  reference_17_ground_Map = data.reference_17_ground_Map
  element_Map = data.element_Map
  unit_Map = data.unit_Map
})


// const reference_Map = new Map([['PH', 7.0], ['arsenic', 6.68], ['cadmium', 0.07], ['chromium', 38], ['copper', 28], ['lead', 25.3]
//   , ['mercury', 0.312], ['nickel', 39], ['antimony', 0.19], ['beryllium', 2.94], ['cobalt', 12.6], ['zinc', 94.9], ['silver', 0.1], ['thallium', 8.05],
// ['tin', 1], ['selenium', 0.44], ['molybdenum', 5.69], ['Alum', 8.5]])

// const element_Map = new Map([['PH', 'PH值'], ['arsenic', '砷'], ['cadmium', '镉'], ['chromium', '铬'], ['copper', '铜'], ['lead', '铅']
//   , ['mercury', '汞'], ['nickel', '镍'], ['antimony', '锑'], ['beryllium', '铍'], ['cobalt', '钴'], ['zinc', '锌'], ['silver', '银'], ['thallium', '铊'],
// ['tin', '锡'], ['selenium', '硒'], ['molybdenum', '钼'], ['Alum', '矾']])
class GroundInfo_Controller {

  static async getLabGroundList(ctx) {
    let req = ctx.request.body
    console.log(req)
    let { selectedProject: project_num, selectedPoint: point_num, selectedAssessType: assess_type, currentPage, page_size } = req
    let res = await AllGroundDataModel.getLabGroundData(project_num, point_num, assess_type, currentPage, page_size)
    let res1 = res.rows
    let count = res.count
 
    let SelectLabGroundData = res1.map(item => {
      let labGround_obj = item.dataValues
      let temp_obj = {}
      let LabGroundData_arr = []
      for(let key in labGround_obj){
        if(reference_17_ground_Map.has(key)){
          if(labGround_obj[key] < reference_17_ground_Map.get(key)){
            LabGroundData_arr.push({
              element: key, 
              value: labGround_obj[key], 
              reference: reference_17_ground_Map.get(key), 
              ispollution: 0, 
              unit: unit_Map.get(key), 
              time: labGround_obj.date
            })
          }else{
            LabGroundData_arr.push({
              element: key, 
              value: labGround_obj[key], 
              reference: reference_17_ground_Map.get(key), 
              ispollution: 1, 
              unit: unit_Map.get(key), 
              time: labGround_obj.date
            })
          }
          temp_obj.labGround_element = LabGroundData_arr
        }else{
          temp_obj[key] = labGround_obj[key]
        }
      }
      return item =temp_obj
      
    })

    // console.log('SelectLabGroundData', SelectLabGroundData)
    
    if (SelectLabGroundData) {

      ctx.body = {
        success: true,
        res: SelectLabGroundData,
        count: count,
        element_Map: Array.from(element_Map), //似乎Map数据不能直接传递，要先转换为数组，前端再转换为Map
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


  static async getDetGroundList(ctx) {
    let req = ctx.request.body
    console.log(req)
    let { selectedProject: project_num, selectedPoint: point_num, selectedAssessType: assess_type, currentPage, page_size } = req
    let res = await AllGroundDataModel.getDetGroundData(project_num, point_num, assess_type, currentPage, page_size)
    let res1 = res.rows
    let count = res.count
 
    let SelectDetGroundData = res1.map(item => {
      let detGround_obj = item.dataValues
      let temp_obj = {}
      let DetGroundData_arr = []
      for(let key in detGround_obj){
        if(reference_17_ground_Map.has(key)){
          if(detGround_obj[key] < reference_17_ground_Map.get(key)){
            DetGroundData_arr.push({
              element: key, 
              value: detGround_obj[key], 
              reference: reference_17_ground_Map.get(key), 
              ispollution: 0, 
              unit: unit_Map.get(key), 
              time: detGround_obj.date
            })
          }else{
            DetGroundData_arr.push({
              element: key, 
              value: detGround_obj[key], 
              reference: reference_17_ground_Map.get(key), 
              ispollution: 1, 
              unit: unit_Map.get(key), 
              time: detGround_obj.date
            })
          }
          temp_obj.detGround_element = DetGroundData_arr
        }else{
          temp_obj[key] = detGround_obj[key]
        }
      }
      return item =temp_obj
      
    })

    // console.log('SelectDetGroundData', SelectDetGroundData)
    
    if (SelectDetGroundData) {
      ctx.body = {
        success: true,
        res: SelectDetGroundData,
        count: count,
        element_Map: Array.from(element_Map), //似乎Map数据不能直接传递，要先转换为数组，前端再转换为Map
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

  static async getLabGroundReference(ctx){
    let sample_num = ctx.params.sample_num
    let res = await AllGroundDataModel.getLabGroundRefData(sample_num)

    let ref_arr = []
    
    let det_obj = res[1].dataValues
    if(res[0]){
      let lab_obj = res[0].dataValues
      for(let key in det_obj){
        if(reference_17_ground_Map.has(key)){
          ref_arr.push({
            element: key,
            value: det_obj[key],
            lab_reference: lab_obj[key], 
            difference: Math.pow(lab_obj[key] - det_obj[key] , 2).toFixed(3),
            unit: unit_Map.get(key)
          })
        }
      }
    }else{
      for(let key in det_obj){
        if(reference_17_ground_Map.has(key)){
          ref_arr.push({
            element: key,
            value: det_obj[key],
            lab_reference: '-1', 
            difference: '-/',
            unit: unit_Map.get(key)
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


module.exports = GroundInfo_Controller
