const AllProjectDataModel = require('../../models/map/projectInfo3.js')
const AllGroundDataModel = require('../../models/map/groundInfo2.js')
const ReferenceDataMOdel = require('../../models/map/reference.js')
const ElementDataModel = require('../../models/map/elementInfo.js')
const PointInfoModel = require('../../models/map/pointInfo.js')
const sample_detector_ground_info_model=require('../../models/map/sample_detector_ground_info.js')

const getMarkerInfo = async function (ctx) {
  let res = await AllProjectDataModel.getAllProjectData()//得到所有的数据
  
  ctx.body = {
    success: true,
    res: res,
    msg: '获取成功'
  }
}

const getMarkerList = async function () {
  const project_num = this.params.project_num
  let res = await AllGroundDataModel.getPoingLocationByGroundnum(project_num)
  // res.push(ground_name_point[project_num])
  ctx.body = {
    success: true,
    res: res,
    msg: '获取成功'
  }
}



const getMapPhByID = async function (ctx) {
  const project_num = ctx.params.project_num
  let res = await PointInfoModel.getAllData(project_num)
  let res1 = res.map(item=>{
    return item = item.dataValues
  })
  //根据project_num得到了不同point_num的数据
  // console.log(1,res1)
  
  point_introList=[]
  point_numList=[]
  Alldata=[]
  for(let key of res1){ 
     point_introList.push(key.point_intro)
     point_numList.push(key.point_num)
     
  }

  for(let i of point_numList){//遍历每个point_num
    let res2 = await sample_detector_ground_info_model.getDataByPointnum(i)
    let res = res2.map(item=>{
      return item = item.dataValues
    })
    //清洗数据
    for(let i of res){
       console.log(i)
       Alldata.push({id:i.id,point_num:i.point_num,point_intro:point_introList[point_numList.indexOf(i.point_num)],attention:i.attention})

    }
  }
  console.log(Alldata)



     ctx.body = {
       success: true,
       res: Alldata,
       msg: '获取成功'
     }

  

   
  }
 
 
  
    
module.exports = {
  getMarkerInfo,
  getMarkerList,
  getMapPhByID,

}
