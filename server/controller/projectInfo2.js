const AllProjectDataModel = require('../models/projectInfo2.js');
const ReferenceDataMOdel=require('../models/reference.js');


const getMapPhByName = async function () {
  const AllProjectData = await AllProjectDataModel.getAllProjectData()
  const ground_name = this.params.ground_name  //获取变量point_num
  let res = await AllProjectDataModel.getLocationNumber(ground_name)//通过point_num去寻找到getAllHistory
  console.log("成功")
  if (res) {
    console.log("成功") 
    let ground_number = res.map(item=>{
      return item = item.dataValues.ground_num
    })
    ground_number=ground_number[0]
    // console.log(ground_number)
    let resph=await AllProjectDataModel.getPhData(ground_number)
    let PHdata = resph.map(item=>{
      return item = item.dataValues
    })
    let HistoryList = []  
    //循环遍历数据库返回的某监测点位所有的历史数据数组，然后改造成前端需要的格式
    PHdata.forEach((item)=>{
      //let in 遍历数组元素即一个包含id,date,point_num还有各种元素值的对象，然后把这些元素对应的值，参考值，时间，是否受污染push到HistoryLists数组中
      for(let key in item){ 
        if(item[key]&&reference.has(key)){ 
        if (item[key] > reference.get(key)) {
          HistoryList.push({element:key, value:item[key], reference: reference.get(key)} )
        }
          
      }   
      }
    })
    // console.log(HistoryList)
    let ElementList=[]

    HistoryList.forEach((item)=>{
      //let in 遍历数组元素即一个包含id,date,point_num还有各种元素值的对象，然后把这些元素对应的值，参考值，时间，是否受污染push到HistoryLists数组中
      // console.log(item)
      for(let i in item){ 
        console.log(item[i])
         ElementList.push(item[i])
      }})
      // console.log(ElementList)
  }
  else {
    console.log("失败")
   
  }
}



const getMapPhByID = async function () {
 const ground_number = this.params.ground_number  //获取变量point_num
 let res = await AllProjectDataModel.getDepthData(ground_number)
 let reference=await ReferenceDataMOdel.getReferenceData()//得到所有的参考值数据
//  console.log(11,reference.PH)
 if (res) {
  let depth = res.map(item=>{
    return item = item.dataValues.point_depth//得到深度数据point_depth
  })
  // console.log(depth,11)
  let point_num = res.map(item=>{
    return item = item.dataValues.point_num//得到检测点位point_num
  }
  )
  //ground_number得到的深度数据放在了depth中[1.3 1.3 1.5]
  //ground_number得到的监测点编号放在了point_num中[ '31010720190001001', '31010720190001002', '31010720190001003' ]
  
  let resph = await AllProjectDataModel.getPhData(point_num)
  let PHdata = resph.map(item=>{
    return item = item.dataValues
  })
  
  
  let PHdataList = []  
    //循环遍历数据库返回的某监测点位所有的历史数据数组，然后改造成前端需要的格式
    PHdata.forEach((item)=>{
      //let in 遍历数组元素即一个包含id,date,point_num还有各种元素值的对象，然后把这些元素对应的值，参考值，时间，是否受污染push到HistoryLists数组中
      // console.log(item,22)
        for(let key in item){ 
          if(key!='id'){
          if(item[key]&&reference[key]){ 
          if (item[key] > reference[key]) {
            
            PHdataList.push({point_number:item['point_num'],depth:depth[point_num.indexOf(item['point_num'])],element:key, value:item[key], reference: reference[key]} )
          }
            }   
        }
      }
    })
    // console.log(PHdataList)
    this.body = {
      success: true,
      res: PHdataList,
      msg: '获取成功'
    }
    //[ { element: 'lead', value: '26.2', reference: 25.3 },
  // { element: 'mercury', value: '0.362', reference: 0.312 },
  // { element: 'cobalt', value: '18.236', reference: 12.6 },

  
 }
 else {
   console.log("失败")
  
 }
}




const getHistory = async function () {
  const AllProjectData = await AllProjectDataModel.getAllProjectData()

  
  if (AllProjectData) {
    
    this.body = {
      success: true,
      res: AllProjectData,
      msg: '获取成功'
    }
  } else {
    this.body = {
      success: false,
      msg: '获取失败'
    }
  }
}

const getAll = async function () {
  const AllProjectData = await AllProjectDataModel.getAllProjectData()
  // console.log('ssssss'+AllProjectData)
  if (AllProjectData) {
    
    this.body = {
      success: true,
      res: AllProjectData,
      msg: '获取成功'
    }
  } else {
    this.body = {
      success: false,
      msg: '获取失败'
    }
  }
}

module.exports = {
  getAll,
  getHistory,
  getMapPhByName,
  getMapPhByID
}
