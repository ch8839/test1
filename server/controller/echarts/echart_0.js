const AllEchartDataModel = require('../../models/echarts/echart_0.js')

const reference = new Map([['PH', 7.0], ['arsenic', 6.68], ['cadmium', 0.07], ['chromium', 38], ['copper', 28], ['lead', 25.3]
  , ['mercury', 0.312], ['nickel', 39], ['antimony', 0.19], ['beryllium', 2.94], ['cobalt', 12.6], ['zinc', 94.9], ['silver', 0.1], ['thallium', 8.05],
['tin', 1], ['selenium', 0.44], ['molybdenum', 5.69], ['Alum', 8.5]])

// const element_Map = new Map([['PH', 'PH值'], ['arsenic', '砷'], ['cadmium', '镉'], ['chromium', '铬'], ['copper', '铜'], ['lead', '铅']
//   , ['mercury', '汞'], ['nickel', '镍'], ['antimony', '锑'], ['beryllium', '铍'], ['cobalt', '钴'], ['zinc', '锌'], ['silver', '银'], ['thallium', '铊'],
// ['tin', '锡'], ['selenium', '硒'], ['molybdenum', '钼'], ['Alum', '矾']])

const AllMap = require('../../models/common/Map.js')

var reference_17_ground_Map, element_Map, unit_Map

AllMap.then(data => {
  element_Map = data.element_Map
  // console.log(element_Map)
}) 

/* 获取级联选择器 */
const getRawCascader = async function (ctx) {
  let AllProjectData = await AllEchartDataModel.getAllProjectData()

  if (AllProjectData) {

    ctx.body = {
      success: true,
      res: AllProjectData,
      msg: '获取成功'
    }
  } else {
    ctx.body = {
      success: false,
      msg: '获取失败'
    }
  }
}

/* 获取类型(assess_type)选择器数据 */
const getRawAssessData = async function (ctx) {
  project_num = ctx.params.project_num;
  //修剪可用键值对
  let AllAssessTypeData = await AllEchartDataModel.getAllAssessTypeData(project_num)
  let res_AllAssessTypeData = AllAssessTypeData.map(item => {
    return item = {
      point_num: item.point_num,
      assess_type: item.assess_type,
    }
  })
  //根据assess_type来修剪数组
  let hash = {};
  res_AllAssessTypeData = res_AllAssessTypeData.reduce((preVal, curVal) => {
    hash[curVal.assess_type] ? '' : hash[curVal.assess_type] = true && preVal.push(curVal);
    return preVal
  }, [])

  //获取类型数组
  let temp_assess_type_arr = []
  res_AllAssessTypeData = res_AllAssessTypeData.map(item => {
    temp_assess_type_arr.push(item.assess_type)
    return item
  })

  if (temp_assess_type_arr) {
    ctx.body = {
      success: true,
      res: temp_assess_type_arr,
      msg: '获取成功'
    }
  } else {
    ctx.body = {
      success: false,
      msg: '获取失败'
    }
  }
}

/* getTableItemsByPN */
const getTableItemsByPN = async function (ctx) {
  const project_num = ctx.params.project_num;
  let AllItemsData = await AllEchartDataModel.getAllTableItemData(project_num);
  let AllPointIntroData = await AllEchartDataModel.getSpecifiedPointIntro();
  let res_AllPointIntroData = AllPointIntroData.map((item) => {
    return item = {
      point_num: item.point_num,
      point_intro: item.point_intro
    }
  })
  // console.log("点位描述", res_AllPointIntroData)
  let res_AllItemsData = AllItemsData.map(item => {
    if(item.attention !== null){
      item.attention = element_Map.get(item.attention)
    }
    return item = {
      point_num: item.point_num,
      // remarks: item.remarks,
      // point_intro: temp_point_intro.point_intro,
      attention: item.attention,
      assess_type: item.assess_type,
      date: item.date,
    }
  })

  //filter 根据类型筛选表格item并且合并不同深度的主要污染元素
  let point_num_toBeFiltered = [];  //用来作为索引数组，遍历时查看是否有重复
  let filtered_res_AllItemsData = []; //
  let temp_attention = [];
  for (let o = 0; o < res_AllItemsData.length; o++) {
    let p = filtered_res_AllItemsData.findIndex((value) => value.point_num == res_AllItemsData[o].point_num && value.assess_type == res_AllItemsData[o].assess_type);
    if (p == -1) {
      point_num_toBeFiltered.push({ point_num: res_AllItemsData[o].point_num, assess_type: res_AllItemsData[o].assess_type })
      if (res_AllItemsData[o].attention == null) {
        filtered_res_AllItemsData.push({
          point_num: res_AllItemsData[o].point_num,
          attention: [],
          assess_type: res_AllItemsData[o].assess_type,
          date: res_AllItemsData[o].date,
          status: null,
        })
      } else {
        let temp_attention = [];
        temp_attention.push(res_AllItemsData[o].attention);
        filtered_res_AllItemsData.push({
          point_num: res_AllItemsData[o].point_num,
          attention: temp_attention,
          assess_type: res_AllItemsData[o].assess_type,
          date: res_AllItemsData[o].date,
          status: null,
        })
      }

    } else {
      //满足上述条件之后（即监测的点位编号相同，类型相同的情况下），进一步筛选（attention不为空，且attention在别的深度没有出现），则把attention添加到原数组中
      if (res_AllItemsData[o].attention !== null && filtered_res_AllItemsData[p].attention.indexOf(res_AllItemsData[o].attention) == -1) {
        filtered_res_AllItemsData[p].attention.push(res_AllItemsData[o].attention)
      }
    }
  }

  filtered_res_AllItemsData.forEach((item) => {
    if(item.attention.length == 0){
      item.attention.push("无")
      item.status = "无超标元素"
    }else{
      item.status = "需要治理"
    }
    res_AllPointIntroData.find((element) => {
      if(item.point_num == element.point_num){
        item.point_name = element.point_intro
      }
    })
  })
  console.log("点位描述", filtered_res_AllItemsData)

  if (filtered_res_AllItemsData) {
    ctx.body = {
      success: true,
      res: filtered_res_AllItemsData,
      msg: '获取成功'
    }
  } else {
    ctx.body = {
      success: false,
      msg: '获取失败'
    }
  }
}

/* 获取Bar图的选择器 */
const getValidElementOfBar =async function (ctx){
  let temp_arr = ctx.request.body
  let {point_num, assess_type} = temp_arr
  // console.log("我是Bar图的element", point_num + " " + assess_type)
  /* let AllValidElement = await AllEchartDataModel.getAllValidElement(point_num, assess_type)
  AllValidElement.map((item)=>{
    return item
  }) */
  // console.log("我是Bar图的element",AllValidElement)
  if (AllValidElement) {

    ctx.body = {
      success: true,
      res: AllValidElement,
      msg: '获取成功'
    }
  } else {
    ctx.body = {
      success: false,
      msg: '获取失败'
    }
  }
}

const getAll = async function (ctx) {
  let AllProjectData = await AllEchartDataModel.getAllProjectData()

  if (AllProjectData) {

    ctx.body = {
      success: true,
      res: AllProjectData,
      msg: '获取成功'
    }
  } else {
    ctx.body = {
      success: false,
      msg: '获取失败'
    }
  }
}

const getGroundList = async function (ctx) {
  let req = ctx.request.body
  let ground_num = req[2]
  let res1 = await AllEchartDataModel.getAllGroundData(ground_num)
  let res2 = await AllEchartDataModel.getElementData()  //不用筛选一下吗？
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

    ctx.body = {
      success: true,
      res: AllGroundData,
      msg: '获取成功'
    }
  } else {
    ctx.body = {
      success: false,
      msg: '获取失败'
    }
  }
};

/* 获取项目体所有点位的元素信息 */
const getSpecifiedElementList = async function (ctx) {
  let req = ctx.request.body
  let ground_num = req[2]
  let res1 = await AllEchartDataModel.getAllGroundData(ground_num)
  let res2 = await AllEchartDataModel.getElementData()  //不用筛选一下吗？
  //对数据库取出的数据做处理得到需要的数组，即dataValues属性的值

  let SpecifiedElementList = {}

  let AllGroundData = res1.map(item => {
    return item = item.dataValues
  })
  let AllElementData = res2.map(item => {
    return item = item.dataValues
  })

  let arr_res = []
  let x = []; //令x等于数据库中对应的深度编号
  let y = []; //令y等于深度编号的文字版本
  let z = []; //令z等于元素的名称数组
  let arr2 = []
  let temp_arr2 = {}
  for (let i = 0; i < AllGroundData.length; i++) {
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
  let res_point_num = res_elements.point_num;

  delete res_elements.id;
  delete res_elements.point_num;
  delete res_elements.ground_num;
  // delete res_elements.time;
  delete res_elements.time;
  // delete res_elements.count;
  delete res_elements.point_depth;

  //echarts_series的赋值
  for (let key in res_elements) {
    let temp_series = [];
    arr2.forEach(function (obj) {
      var m = obj[key];
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


  // z的赋值
  arr_res.forEach(function (obj) {
    let n = obj.name;
    z.push(n);
  });

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

  if (SpecifiedElementList) {

    ctx.body = {
      success: true,
      res: SpecifiedElementList,
      res1: arr_res,
      msg: '获取成功'
    }
  } else {
    ctx.body = {
      success: false,
      msg: '获取失败'
    }
  }
};

const getAllPieData = async function (ctx) {

  const point_num = ctx.params.point_num

  let res = await AllEchartDataModel.getAllEchartData(point_num)


  let Echart_arr = res.map(item => {
    return item = item.dataValues
  })

  let AllEchartData = []

  /*   Echart_arr.forEach((item)=>{
      //let in 遍历数组元素即一个包含id,date,point_num还有各种元素值的对象，然后把这些元素对应的值，参考值，时间，是否受污染push到HistoryLists数组中
      for(let key in item){ 
        if(item[key]&&element_Map.has(key)){ 
        if (item[key] && element_Map.get(key)) {
          AllEchartData.push({ name: element_Map.get(key), value:item[key]})
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
      } else {
        AllEchartData.push({ name: element_Map.get(key), value: Echart_arr[0][key] })
      }
    }
  }

  if (res) {
    ctx.body = {
      success: true,
      res: AllEchartData,
      msg: '获取成功'
    }
  } else {
    ctx.body = {
      success: false,
      msg: '获取失败'
    }
  }
}

const getPieDataName = async function (ctx) {

  const point_num = ctx.params.point_num
  let req = await AllEchartDataModel.getAllEchartData(point_num)

  let arr = req.map(item => {
    return item = item.dataValues
  })

  let AllEchartData = []

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
    ctx.body = {
      //success: true,
      req: AllEchartData,
      //msg: '获取成功'
    }
  } else {
    ctx.body = {
      success: false,
      msg: '获取失败'
    }
  }
}

const getRadarRealTimeValue = async function (ctx) {

  const point_num = ctx.params.point_num
  let res = await AllEchartDataModel.getAllEchartData(point_num)

  let Echart_arr = res.map(item => {
    return item = item.dataValues
  })

  let AllEchartData = []

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
    ctx.body = {
      success: true,
      res: AllEchartData,
      msg: '获取成功'
    }
  } else {
    ctx.body = {
      success: false,
      msg: '获取失败'
    }
  }
}

const getRadarData = async function (ctx) {

  // const id = this.params.id
  const id = ctx.params.id;
  if (id > 1) {
    let resDatar_arr = await AllEchartDataModel.getAllRadarData(id)

    let Datar_arr = resDatar_arr.map(item => {
      return item = item.dataValues
    })

    let AllRadarData = []


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

    if (resDatar_arr) {
      ctx.body = {
        success: true,
        resDatar_arr: AllRadarData,
        msg: '获取成功'
      }
    } else {
      ctx.body = {
        success: false,
        msg: '获取失败'
      }
    }

  } else {
    let resDatar_arr = await AllEchartDataModel.getAllRadarData(id)

    let Datar_arr = resDatar_arr.map(item => {
      return item = item.dataValues
    })

    let AllRadarData = []

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
      ctx.body = {
        success: true,
        resDatar_arr: AllRadarData,
        msg: '获取成功'
      }
    } else {
      ctx.body = {
        success: false,
        msg: '获取失败'
      }
    }
  }
}

module.exports = {
  getRawCascader,
  getRawAssessData,
  getTableItemsByPN,
  getValidElementOfBar,
  //以下为原生
  getAll,
  getGroundList,
  getSpecifiedElementList,
  getAllPieData,
  getPieDataName,
  getRadarRealTimeValue,
  getRadarData
}