const AllEchartDataModel = require('../models/echart.js')

const element_Map = new Map([['PH', 'PH值'], ['arsenic', '砷'], ['cadmium', '镉'], ['chromium', '铬'], ['copper', '铜'], ['lead', '铅']
  , ['mercury', '汞'], ['nickel', '镍'], ['antimony', '锑'], ['beryllium', '铍'], ['cobalt', '钴'], ['zinc', '锌'], ['silver', '银'], ['thallium', '铊'],
['tin', '锡'], ['selenium', '硒'], ['molybdenum', '钼'], ['Alum', '矾']])

const getAllPieData = async function () {

  const point_num = this.params.point_num
   console.log("point_num in controller", point_num);

  let res = await AllEchartDataModel.getAllEchartData(point_num)


  let Echart_arr = res.map(item => {
    return item = item.dataValues
  })
  console.log("我是Echart_arr", Echart_arr)


  let AllEchartData = []
  // console.log(Echart_arr)

  /*   Echart_arr.forEach((item)=>{
      //let in 遍历数组元素即一个包含id,date,point_num还有各种元素值的对象，然后把这些元素对应的值，参考值，时间，是否受污染push到HistoryLists数组中
      for(let key in item){ 
        if(item[key]&&element_Map.has(key)){ 
        if (item[key] && element_Map.get(key)) {
          AllEchartData.push({ name: element_Map.get(key), value:item[key]})
          // console.log("我是AllEchartData",AllEchartData)
        }else{
          AllEchartData.push({ name: element_Map.get(key), value:item[key]})
        } 
      }   
      }
    }) */
  /* 遍历对应point_num的点位，如果有多个，则选取第0个 */
  for (let key in Echart_arr[0]) {
    if (Echart_arr[0][key] && element_Map.has(key)) {
      if (Echart_arr[0][key] && element_Map.get(key)) {
        AllEchartData.push({ name: element_Map.get(key), value: Echart_arr[0][key] })
        // console.log("我是AllEchartData",AllEchartData)
      } else {
        AllEchartData.push({ name: element_Map.get(key), value: Echart_arr[0][key] })
      }
    }
  }
  // console.log("我是AllEchartData",AllEchartData)


  if (res) {
    this.body = {
      success: true,
      res: AllEchartData,
      msg: '获取成功'
    }
  } else {
    this.body = {
      success: false,
      msg: '获取失败'
    }
  }
}

const getPieDataName = async function () {

  const point_num = this.params.point_num
  let req = await AllEchartDataModel.getAllEchartData(point_num)

  let arr = req.map(item => {
    return item = item.dataValues
  })

  let AllEchartData = []
  //  console.log(arr)

  arr.forEach((item) => {
    //let in 遍历数组元素即一个包含id,date,point_num还有各种元素值的对象，然后把这些元素对应的值，参考值，时间，是否受污染push到HistoryLists数组中
    for (let key in item) {
      if (item[key] && element_Map.has(key)) {
        if (item[key] && element_Map.get(key)) {
          //  AllEchartData.push({ element_Map: element_Map.get(key)})
          AllEchartData.push(element_Map.get(key))
        } else {
          //  AllEchartData.push({  element_Map: element_Map.get(key)})
          AllEchartData.push(element_Map.get(key))
        }
      }
    }
  })

  if (req) {
    this.body = {
      //success: true,
      req: AllEchartData,
      //msg: '获取成功'
    }
  } else {
    this.body = {
      success: false,
      msg: '获取失败'
    }
  }
}

module.exports = {
  getAllPieData,
  getPieDataName
}