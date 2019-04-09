const AllGroundDataModel = require('../models/groundInfo.js')

const reference = new Map([['PH', 7.0], ['arsenic', 6.68], ['cadmium', 0.07], ['chromium', 38], ['copper', 28], ['lead', 25.3]
, ['mercury',0.312], ['nickel', 39], ['antimony', 0.19], ['beryllium', 2.94], ['cobalt', 12.6], ['zinc', 94.9], ['silver', 0.1], ['thallium', 8.05],
['tin', 1], ['selenium', 0.44], ['molybdenum', 5.69], ['Alum', 8.5]])

const element_Map = new Map([['PH', 'PH值'], ['arsenic', '砷'], ['cadmium', '镉'], ['chromium', '铬'], ['copper', '铜'], ['lead','铅']
, ['mercury','汞'], ['nickel','镍'], ['antimony', '锑'], ['beryllium', '铍'], ['cobalt', '钴'], ['zinc', '锌'], ['silver', '银'], ['thallium', '铊'],
['tin', '锡'], ['selenium', '硒'], ['molybdenum', '钼'], ['Alum', '矾']])

const getGroundList = async function () {
  let req = this.request.body
  let ground_num = req[2]
  let res1 = await AllGroundDataModel.getAllGroundData(ground_num)
  let res2 = await AllGroundDataModel.getElementData()
  //对数据库取出的数据做处理得到需要的数组，即dataValues属性的值
  let AllGroundData = res1.map(item => {
    return item = item.dataValues
  })

  let AllElementData = res2.map(item => {
    return item = item.dataValues
  })
  let date = new Date()
  let year = date.getFullYear()
  let month = date.getMonth() + 1 //js中month为0~11
  let day = date.getDate()
 
  /* 目的是为了把某点位的当天元素数据和其它点位信息如点位深度、点位位置等融合为一个对象作为数组的元素传递给前端 */
  //循环遍历所有的某地块监测点位列表，对元素数据列表做筛选，筛选出对应地块当天的数据
  for (let i = 0; i < AllGroundData.length; i++) {
    let arr_res = []
    let arr2 = AllElementData.filter(item => {
      if (item.point_num == AllGroundData[i].point_num) {
        let arr_time = item.date.split('.')
        if (year == arr_time[0] && month == arr_time[1] && day == arr_time[2]) {
          return true
        }
      }
    })
    console.log('arr2', arr2)

    //筛选完毕后判断是否有当天数据，有的话令obj_element等于这个数组第一个下标即一个对象，let in循环这个对象，首先判断是否是需要的对象key
    //比如date,id,point_num这种数据就不再需要了，直接利用一个Map映射判断，还要判断这个key即这个元素是否有值，有的监测元素该监测点位没有，没有的话就不用push进来了
    //然后是简单的判断元素值和参考值的大小关系来决定是否受污染
    if (arr2.length) {
      let obj_element = arr2[0]
      for (let key in obj_element) {
        if (reference.has(key)&&obj_element[key]) {          
          if (obj_element[key] < reference.get(key)) {
            arr_res.push({ element: key, value: obj_element[key] , reference:reference.get(key), ispollution: 0 })
          }else{
            arr_res.push({ element: key, value: obj_element[key] , reference:reference.get(key), ispollution: 1 })
          }       
        }
      }
    }else{
      arr_res.push({ ispollution:3 })
    }
    //最后令AllGroundData新增一条属性point_element并令值为arr_res
    AllGroundData[i].point_element = arr_res 
  }
  if (AllGroundData) {

    this.body = {
      success: true,
      res: AllGroundData,
      msg: '获取成功'
    }
  } else {
    this.body = {
      success: false,
      msg: '获取失败'
    }
  }
};

//获得所有的历史数据
const getAllHistoryData = async function () {
  const point_num = this.params.point_num
  let res = await AllGroundDataModel.getAllHistory(point_num)
  let History_arr = res.map(item=>{
    return item = item.dataValues
  })
  let HistoryList = []
  console.log(History_arr)

  //循环遍历数据库返回的某监测点位所有的历史数据数组，然后改造成前端需要的格式
  History_arr.forEach((item)=>{
    //let in 遍历数组元素即一个包含id,date,point_num还有各种元素值的对象，然后把这些元素对应的值，参考值，时间，是否受污染push到HistoryLists数组中
    for(let key in item){ 
      if(item[key]&&reference.has(key)){ 
      if (item[key] < reference.get(key)) {
        HistoryList.push({element:key, value:item[key], reference: reference.get(key), date:item.date, ispollution:0})
      }else{
        HistoryList.push({element:key, value:item[key], reference: reference.get(key), date:item.date ,ispollution:1})
      } 
    }   
    }
  })

  if (res) {
    this.body = {
      success: true,
      res: HistoryList,
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
  getGroundList,
  getAllHistoryData
}
