const AllProjectDataModel = require('../../models/map/projectInfo3.js')
const AllGroundDataModel = require('../../models/map/groundInfo2.js')
const ReferenceDataMOdel = require('../../models/map/reference.js')
const ElementDataModel = require('../../models/map/elementInfo.js')
const PointInfoModel = require('../../models/map/pointInfo.js')
const sample_detector_ground_info_model=require('../../models/map/sample_detector_ground_info.js')



var reference_Map
var element_Map
var unit_Map

const getReference = async function () {
  let referenceInfo = await AllGroundDataModel.getReferenceInfo()
  let unitInfo = await AllGroundDataModel.getUnitInfo()

  let referenceList = referenceInfo.map(item => {
    return item = item.dataValues
  })
  let unitList = unitInfo.map(item => {
    return item = item.dataValues
  })

  let referenceObj = referenceList[0]
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

  reference_Map = new Map(reference_Map_arr)//拿到国标的标准值
  element_Map = new Map(element_Map_arr)//拿到中英文映射
  unit_Map = new Map(unit_Map_arr)//拿到单位映射
  // console.log(1,reference_Map)
  // console.log(2,element_Map)
  // console.log(3,unit_Map)
}


// 计算所有的simple_count, detail_count,fixed_count,all_count
const ComputeCount = async function (ctx) {
  
    let res = await sample_detector_ground_info_model.getAlldata()//得到所有的数据
    let reference = await ReferenceDataMOdel.getReferenceData()//得到所有的参考值数据
    let res2 = res.map(item=>{
        return item = item.dataValues
      })
      for (let x of res2) {
          var count=0
          for (let i in x){
        if (x[i] && reference[i] && (x[i] > reference[i])) {
         count+=1
        }
      }
      const res = await sample_detector_ground_info_model.UpdateCount(x.point_num, x.sample_num, count)
    }//这个过程结束后sample_detector_ground_info_model每个样本的count都会重新更新一遍
// 接下来来更新project_info的count数据
       const res3 = await AllProjectDataModel.getAllProjectData()
       let res4 = res3.map(item=>{
        return item = item.dataValues
      })
      for (let item of res4) { 
        let Point_numList = await PointInfoModel.getPointnumByProjectnum(item.project_num)
        
          var simple_count=0
          var detail_count=0
          var fixed_count=0
         
        for (let x of Point_numList ){
            
        let data = await sample_detector_ground_info_model.getDataByPointnum(x)
        
        let res5 = data.map(item=>{
            return item = item.dataValues
          })
          console.log(11,res5) //res5里是个列表，列表里放的数据都是同一个point_num
          var point_count=0
        for (let y of res5){

            if (y.assess_type==1 && y.project_num==item.project_num){
                  simple_count+=y.count
                  point_count+=y.count
            }
            if (y.assess_type==2 && y.project_num==item.project_num){
                detail_count+=y.count
                point_count+=y.count

            }
            if (y.assess_type==3 && y.project_num==item.project_num){
                fixed_count+=y.count
                point_count+=y.count

           }
        }
        all_count=simple_count+detail_count+fixed_count
        
        const res = await AllProjectDataModel.UpdatedifferentCount(item.project_num,simple_count, detail_count,fixed_count,all_count)
        const res10 = await PointInfoModel.UpdatedifferentCount(x,point_count)

        }
      }
    ctx.body = {
      success: true,
      res: res,
      msg: '获取成功'
    }
  }


//   reference_Map = new Map(reference_Map_arr)//拿到国标的标准值
//   element_Map = new Map(element_Map_arr)//拿到中英文映射
//   unit_Map = new Map(unit_Map_arr)//拿到单位映射
  const ComputeAttention = async function (ctx) {
    const reference1 = await getReference()
    let reference = await ReferenceDataMOdel.getReferenceData()//得到所有的参考值数据
    
    let Alldata = await sample_detector_ground_info_model.getAlldata()
    let res = Alldata.map(item=>{
        return item = item.dataValues
      })
    for(let i of res){
        var chazhi=0
        var attention=-1
        for (let item in i ){
           
            if (i[item]>reference[item]&&(i[item]-reference[item])>chazhi&&element_Map.has(item)){
                chazhi=i[item]-reference[item]
                attention=item
            }
            let data = await sample_detector_ground_info_model.UpdateAttention(i.sample_num,attention)

        }
    
}
  }

  module.exports = {
    ComputeCount,
    ComputeAttention,
   
  }
  