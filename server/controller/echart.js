const AllProjectDataModel = require('../models/echart.js')
const AllEchartDataModel = require('../models/echart.js')
const AllRadarDataModel = require('../models/echart.js')
const AllGroundDataModel = require('../models/echart.js')

const reference = new Map([['PH', 7.0], ['arsenic', 6.68], ['cadmium', 0.07], ['chromium', 38], ['copper', 28], ['lead', 25.3]
  , ['mercury', 0.312], ['nickel', 39], ['antimony', 0.19], ['beryllium', 2.94], ['cobalt', 12.6], ['zinc', 94.9], ['silver', 0.1], ['thallium', 8.05],
['tin', 1], ['selenium', 0.44], ['molybdenum', 5.69], ['Alum', 8.5]])

const element_Map = new Map([['PH', 'PH值'], ['arsenic', '砷'], ['cadmium', '镉'], ['chromium', '铬'], ['copper', '铜'], ['lead', '铅']
  , ['mercury', '汞'], ['nickel', '镍'], ['antimony', '锑'], ['beryllium', '铍'], ['cobalt', '钴'], ['zinc', '锌'], ['silver', '银'], ['thallium', '铊'],
['tin', '锡'], ['selenium', '硒'], ['molybdenum', '钼'], ['Alum', '矾']])

const getAll = async function () {
  let AllProjectData = await AllProjectDataModel.getAllProjectData()

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

const getGroundList = async function () {
  let req = this.request.body
  let ground_num = req[2]
  let res1 = await AllGroundDataModel.getAllGroundData(ground_num)
  let res2 = await AllGroundDataModel.getElementData()  //不用筛选一下吗？
  //对数据库取出的数据做处理得到需要的数组，即dataValues属性的值
  let AllGroundData = res1.map(item => {
    // console.log("item.dataValues in groundinfo.js", item.dataValues);
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
    // console.log('arr2', arr2)

    //筛选完毕后判断是否有当天数据，有的话令obj_element等于这个数组第一个下标即一个对象，let in循环这个对象，首先判断是否是需要的对象key
    //比如date,id,point_num这种数据就不再需要了，直接利用一个Map映射判断，还要判断这个key即这个元素是否有值，有的监测元素该监测点位没有，没有的话就不用push进来了
    //然后是简单的判断元素值和参考值的大小关系来决定是否受污染
    if (arr2.length) {
      let obj_element = arr2[0]
      for (let key in obj_element) {
        if (reference.has(key) && obj_element[key]) {
          if (obj_element[key] < reference.get(key)) {
            arr_res.push({ element: key, value: obj_element[key], reference: reference.get(key), ispollution: 0 })
          } else {
            arr_res.push({ element: key, value: obj_element[key], reference: reference.get(key), ispollution: 1 })
          }
        }
      }
    } else {
      arr_res.push({ ispollution: 3 })
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

/* 获取项目体所有点位的元素信息 */
const getSpecifiedElementList = async function () {
  let req = this.request.body
  let ground_num = req[2]
  console.log("我是ground_num in ground_info", ground_num)
  let res1 = await AllGroundDataModel.getAllGroundData(ground_num)
  // console.log("res1", res1)
  let res2 = await AllGroundDataModel.getElementData()  //不用筛选一下吗？
  //对数据库取出的数据做处理得到需要的数组，即dataValues属性的值

  let SpecifiedElementList = {}

  let AllGroundData = res1.map(item => {
    // console.log("item.dataValues in groundinfo.js", item.dataValues);
    return item = item.dataValues
  })
  // console.log("AllGroundData", AllGroundData);
  let AllElementData = res2.map(item => {
    // console.log("item.dataValues in groundinfo.js", item.dataValues);
    return item = item.dataValues
  })

  let arr_res = []
  let x = []; //令x等于数据库中对应的深度编号
  let y = []; //令y等于深度编号的文字版本
  let z = []; //令z等于元素的名称数组
  let arr2 = []
  let temp_arr2 = {}
  for (let i = 0; i < AllGroundData.length; i++) {
    console.log("我是AllGroundData", AllGroundData)
    temp_arr2 = AllElementData.filter(item => {
      if (item.point_num == AllGroundData[i].point_num) {
        // let arr_time = item.date.split('.')

        // if (year === arr_time[0] && month === arr_time[1] && day === arr_time[2]) {
        x.push(item.point_num)
        return true
        // }
      }
    })
    // arr2.push(temp_arr2)
    arr2[i] = temp_arr2[0]
    // console.log('arr2', arr2)
  }

  //筛选完毕后判断是否有当天数据，有的话令obj_element等于这个数组第一个下标即一个对象，let in循环这个对象，首先判断是否是需要的对象key
  //比如date,id,point_num这种数据就不再需要了，直接利用一个Map映射判断，还要判断这个key即这个元素是否有值，有的监测元素该监测点位没有，没有的话就不用push进来了
  //然后是简单的判断元素值和参考值的大小关系来决定是否受污染
  //y的赋值
  for (let j = 0; j < x.length; j++) {
    y.push("深度" + (j + 1));
  }
  //获取元素
  let res_elements = arr2[0];
  console.log("woshi res_elements 里面的point_num", res_elements.point_num)
  let res_point_num = res_elements.point_num;

  delete res_elements.id;
  delete res_elements.point_num;
  delete res_elements.ground_num;
  // delete res_elements.time;
  delete res_elements.time;
  // delete res_elements.count;
  delete res_elements.point_depth;
  console.log('arr2', arr2)
  // console.log('res_elements', res_elements)

  // console.log("arr2[0]",arr2[0])
  //echarts_series的赋值
  for (let key in res_elements) {
    let temp_series = [];
    // console.log('key',key)
    arr2.forEach(function (obj) {
      var m = obj[key];
      // console.log("parseInt(obj[key])", obj[key])
      if (m !== null) {
        temp_series.push(m);
      } else {
        temp_series.push("null");
      }
      // temp_series.push(m);
    });
    arr_res.push({
      name: element_Map.get(key), type: "bar", stack: "true", data: temp_series, barWidth: 75,
      //begin
      itemStyle: {
        normal: {
          shadowBlur: 1,
          color: '#99CC99'
        },
        //鼠标悬停时：
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          // shadowColor: '#FCCE10'
        }
      },
      //end
    });
  }

  // console.log("temp_series", temp_series);

  // z的赋值
  arr_res.forEach(function (obj) {
    // console.log(typeof(obj[key]));
    let n = obj.name;
    // console.log(n);
    z.push(n);
  });
  // console.log("zzz", z);

  //全局变量赋值
  SpecifiedElementList.locationnumber = x;
  SpecifiedElementList.locationtext = y;
  SpecifiedElementList.pelements = z;
  SpecifiedElementList.point_num = res_point_num;

  // SpecifiedElementList.series = arr_res;
  // SpecifiedElementList.push(x);
  // SpecifiedElementList.push(y);
  // SpecifiedElementList.push(z);
  // SpecifiedElementList[0] = x;
  // SpecifiedElementList[1] = y;
  // SpecifiedElementList[2] = z;
  // SpecifiedElementList[3] = res_point_num;

  // AllGroundData[3] = SpecifiedElementList
  console.log("final Location", SpecifiedElementList)

  if (SpecifiedElementList) {

    this.body = {
      success: true,
      res: SpecifiedElementList,
      res1: arr_res,
      msg: '获取成功'
    }
  } else {
    this.body = {
      success: false,
      msg: '获取失败'
    }
  }
};

const getAllPieData = async function () {

  const point_num = this.params.point_num
  //  console.log("point_num in controller", point_num);

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

const getRadarRealTimeValue = async function () {

  // console.log("我是雷达的point_num")
  const point_num = this.params.point_num
  console.log("我是雷达的point_num", point_num)
  let res = await AllEchartDataModel.getAllEchartData(point_num)

  let Echart_arr = res.map(item => {
    return item = item.dataValues
  })

  let AllEchartData = []
  console.log(Echart_arr)

  Echart_arr.forEach((item) => {

    for (let key in item) {
      if (element_Map.has(key)) {
        if (item[key] == null) {
          item[key] = "null"
          AllEchartData.push(item[key])
        } else {
          AllEchartData.push(item[key])
        }
      }
    }
  })

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

const getRadarData = async function () {

  // const id = this.params.id
  const id = this.params.id;
  console.log("hellohello", id);
  if (id > 1) {
    let resDatar_arr = await AllRadarDataModel.getAllRadarData(id)

    let Datar_arr = resDatar_arr.map(item => {
      return item = item.dataValues
    })

    let AllRadarData = []
    console.log(Datar_arr)


    Datar_arr.forEach((item) => {
      //let in 遍历数组元素即一个包含id,date,point_num还有各种元素值的对象，然后把这些元素对应的值，参考值，时间，是否受污染push到HistoryLists数组中
      for (let key in item) {
        if (item[key] && element_Map.has(key)) {
          if (item[key] && element_Map.get(key)) {
            AllRadarData.push({ text: element_Map.get(key), max: item[key] })
          } else {
            AllRadarData.push({ text: element_Map.get(key), max: item[key] })
          }
        }
      }
    })
    console.log("我是最大值", resDatar_arr)

    if (resDatar_arr) {
      this.body = {
        success: true,
        resDatar_arr: AllRadarData,
        msg: '获取成功'
      }
    } else {
      this.body = {
        success: false,
        msg: '获取失败'
      }
    }

  } else {
    let resDatar_arr = await AllRadarDataModel.getAllRadarData(id)

    let Datar_arr = resDatar_arr.map(item => {
      return item = item.dataValues
    })

    let AllRadarData = []
    console.log(Datar_arr)


    Datar_arr.forEach((item) => {
      //let in 遍历数组元素即一个包含id,date,point_num还有各种元素值的对象，然后把这些元素对应的值，参考值，时间，是否受污染push到HistoryLists数组中
      for (let key in item) {
        if (item[key] && element_Map.has(key)) {
          if (item[key] && element_Map.get(key)) {
            AllRadarData.push(item[key])
          } else {
            AllRadarData.push(item[key])
          }
        }
      }
    })

    if (resDatar_arr) {
      this.body = {
        success: true,
        resDatar_arr: AllRadarData,
        msg: '获取成功'
      }
    } else {
      this.body = {
        success: false,
        msg: '获取失败'
      }
    }
  }
}

module.exports = {
  getAll,
  getGroundList,
  getSpecifiedElementList,
  getAllPieData,
  getPieDataName,
  getRadarRealTimeValue,
  getRadarData
}