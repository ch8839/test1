const AllGroundDataModel = require('../../models/table/groundInfo.js')

var reference_Map
var element_Map
var unit_Map

const getReference = (async function () {
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

  reference_Map = new Map(reference_Map_arr)
  element_Map = new Map(element_Map_arr)
  unit_Map = new Map(unit_Map_arr)
})()


// const reference = new Map([['PH', 7.0], ['arsenic', 6.68], ['cadmium', 0.07], ['chromium', 38], ['copper', 28], ['lead', 25.3]
//   , ['mercury', 0.312], ['nickel', 39], ['antimony', 0.19], ['beryllium', 2.94], ['cobalt', 12.6], ['zinc', 94.9], ['silver', 0.1], ['thallium', 8.05],
// ['tin', 1], ['selenium', 0.44], ['molybdenum', 5.69], ['Alum', 8.5]])

// const element_Map = new Map([['PH', 'PH值'], ['arsenic', '砷'], ['cadmium', '镉'], ['chromium', '铬'], ['copper', '铜'], ['lead', '铅']
//   , ['mercury', '汞'], ['nickel', '镍'], ['antimony', '锑'], ['beryllium', '铍'], ['cobalt', '钴'], ['zinc', '锌'], ['silver', '银'], ['thallium', '铊'],
// ['tin', '锡'], ['selenium', '硒'], ['molybdenum', '钼'], ['Alum', '矾']])
class GroundInfo_Controller {

  static async getGroundMarkerList(ctx) {
    let ground_num = ctx.params.ground_num
    let res = await AllGroundDataModel.getGroundMarkerList(ground_num)
    let MarkerList = res.map(item => {
      return item = item.dataValues
    })

    if (res) {
      ctx.body = {
        success: true,
        res: MarkerList,
        msg: "获取坐标成功"
      }
    } else {
      ctx.body = {
        success: false,
        res: [],
        msg: "获取坐标失败"
      }
    }
  }

  static async getGroundList(ctx) {
    // const reference = await getReference()
    // const element_Map = await getUnit() //通过这种方式每回请求都要执行生成Map映射，所以直接定义全局变量，并立即执行生成Map映射函数，之后取映射时不用再执行
    let req = ctx.request.body
    console.log(req)
    let { selectedOptions: ground_num, currentPage, page_size } = req
    let res = await AllGroundDataModel.getAllGroundData(ground_num, currentPage, page_size)
    let res1 = res.rows
    let count = res.count
    let res2 = await AllGroundDataModel.getRealTimeElementData(ground_num)
    //对数据库取出的数据做处理得到需要的数组，即dataValues属性的值
    // console.log(res1)
    let SelectGroundData = res1.map(item => {
      return item = item.dataValues
    })

    let TodayElementData = res2.map(item => {
      return item = item.dataValues
    })


    /* 目的是为了把某点位的当天元素数据和其它点位信息如点位深度、点位位置等融合为一个对象作为数组的元素传递给前端 */
    //循环遍历所有的某地块监测点位列表，对元素数据列表做筛选，筛选出对应地块当天的数据
    for (let i = 0; i < SelectGroundData.length; i++) {
      let arr_res = []
      let arr2 = TodayElementData.filter(item => {
        if (item.point_num == SelectGroundData[i].point_num && item.point_depth == SelectGroundData[i].point_depth) {
          return true
        }
      })
      // console.log('arr2', arr2)

      //筛选完毕后判断是否有当天数据，有的话令obj_element等于这个数组第一个下标即一个对象，let in循环这个对象，首先判断是否是需要的对象key
      //比如date,id,point_num这种数据就不再需要了，直接利用一个Map映射判断，还要判断这个key即这个元素是否有值，有的监测元素该监测点位没有，没有的话就不用push进来了
      //然后是简单的判断元素值和参考值的大小关系来决定是否受污染
      if (arr2.length) {
        let obj_element = arr2[0]
        for (let key in obj_element) {
          if (reference_Map.has(key) && obj_element[key]) {
            if (obj_element[key] < reference_Map.get(key)) {
              arr_res.push({ element: key, value: obj_element[key], reference: reference_Map.get(key), ispollution: 0, unit: unit_Map.get(key), time: obj_element.time })
            } else {
              arr_res.push({ element: key, value: obj_element[key], reference: reference_Map.get(key), ispollution: 1, unit: unit_Map.get(key), time: obj_element.time })
            }
          }
        }
      } else {
        arr_res.push({ ispollution: 3 })
      }
      //最后令AllGroundData新增一条属性point_element并令值为arr_res
      SelectGroundData[i].point_element = arr_res
    }
    if (SelectGroundData) {

      ctx.body = {
        success: true,
        res: SelectGroundData,
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
  };

  //获得所有的历史数据
  static async getAllHistoryData(ctx) {
    const HistoryTableOptions = ctx.request.body
    // console.log('HistoryTableOptions', HistoryTableOptions)
    let { point_num, point_depth, fliter_element, fliter_date, currentPage, page_size } = HistoryTableOptions

    fliter_date = fliter_date.map((item) => {
      let time_arr = item.split('-')
      return new Date(time_arr[0], time_arr[1] - 1, time_arr[2], 8, 0, 0)
    })
    if (!fliter_date) {
      fliter_date = []
    }

    let res = await AllGroundDataModel.getAllHistory(point_num, point_depth, fliter_element, fliter_date)
    let res2 = await AllGroundDataModel.getSelectOptions(point_num, point_depth)

    let History_arr = res.map(item => {
      return item = item.dataValues
    })
    let SelectOptions = res2.map(item => {
      return item = item.dataValues
    })

    let SelectOptions_arr = []
    SelectOptions.forEach(item => {
      for (let key in item) {
        if (item[key]) {
          SelectOptions_arr.push(key)
        }
      }
    })
    SelectOptions_arr = SelectOptions_arr.filter((item, index, self) => {
      return index == self.indexOf(item)
    })

    let HistoryList = []
    // console.log('History_arr', History_arr)

    //循环遍历数据库返回的某监测点位所有的历史数据数组，然后改造成前端需要的格式
    History_arr.forEach((item) => {
      //let in 遍历数组元素即一个包含id,date,point_num还有各种元素值的对象，然后把这些元素对应的值，参考值，时间，是否受污染push到HistoryLists数组中
      for (let key in item) {
        if (item[key] && reference_Map.has(key)) {
          if (item[key] < reference_Map.get(key)) {
            HistoryList.push({ element: key, value: item[key], reference: reference_Map.get(key), unit: unit_Map.get(key), date: item.date, ispollution: 0 })
          } else {
            HistoryList.push({ element: key, value: item[key], reference: reference_Map.get(key), unit: unit_Map.get(key), date: item.date, ispollution: 1 })
          }
        }
      }
    })

    let start = page_size * (currentPage - 1)
    let count = HistoryList.length
    HistoryList = HistoryList.slice(start, start + page_size)
    console.log('HistoryList', HistoryList)
    if (res) {
      ctx.body = {
        success: true,
        res: HistoryList,
        count: count,
        element_options_arr: SelectOptions_arr,
        msg: '获取成功'
      }
    } else {
      ctx.body = {
        success: true,
        res: [],
        count: 0,
        msg: '没有历史数据'
      }
    }
  };
}
// /* 获取项目体所有点位的元素信息 */
// const getSpecifiedElementList = async function () {
//   let req = this.request.body
//   let ground_num = req[2]
//   let res1 = await AllGroundDataModel.getAllGroundData2(ground_num)
//   // console.log("res1", res1)
//   let res2 = await AllGroundDataModel.getElementData()  //不用筛选一下吗？
//   //对数据库取出的数据做处理得到需要的数组，即dataValues属性的值

//   let SpecifiedElementList = []

//   let AllGroundData = res1.map(item => {
//     return item = item.dataValues
//   })

//   let AllElementData = res2.map(item => {
//     // console.log("item.dataValues in groundinfo.js", item.dataValues);
//     return item = item.dataValues
//   })
//   // let date = new Date()
//   // let year = date.getFullYear()
//   // let month = date.getMonth() + 1 //js中month为0~11
//   // let day = date.getDate()
//   // let year = '2019'
//   // let month = '04' //js中month为0~11
//   // let day = '08'
//   /* 目的是为了把某点位的当天元素数据和其它点位信息如点位深度、点位位置等融合为一个对象作为数组的元素传递给前端 */
//   //循环遍历所有的某地块监测点位列表，对元素数据列表做筛选，筛选出对应地块当天的数据

//   let arr_res = []
//   let x = []; //令x等于数据库中对应的深度编号
//   let y = []; //令y等于深度编号的文字版本
//   let z = []; //令z等于元素的名称数组
//   let arr2 = []
//   let temp_arr2 = {}
//   for (let i = 0; i < AllGroundData.length; i++) {

//     temp_arr2 = AllElementData.filter(item => {
//       if (item.point_num == AllGroundData[i].point_num) {
//         // let arr_time = item.date.split('.')

//         // if (year === arr_time[0] && month === arr_time[1] && day === arr_time[2]) {
//         x.push(item.point_num)
//         return true
//         // }
//       }
//     })
//     // arr2.push(temp_arr2)
//     arr2[i] = temp_arr2[0]
//     console.log('arr2', arr2)
//   }

//   //筛选完毕后判断是否有当天数据，有的话令obj_element等于这个数组第一个下标即一个对象，let in循环这个对象，首先判断是否是需要的对象key
//   //比如date,id,point_num这种数据就不再需要了，直接利用一个Map映射判断，还要判断这个key即这个元素是否有值，有的监测元素该监测点位没有，没有的话就不用push进来了
//   //然后是简单的判断元素值和参考值的大小关系来决定是否受污染
//   //y的赋值
//   for (let j = 0; j < x.length; j++) {
//     y.push("点位" + (j + 1));
//   }
//   //获取元素
//   let res_elements = arr2[0];
//   let res_point_num = res_elements.point_num;

//   delete res_elements.id;
//   delete res_elements.point_num;
//   delete res_elements.date;
//   // console.log('res_elements', res_elements)

//   // console.log("arr2[0]",arr2[0])
//   //echarts_series的赋值
//   for (let key in res_elements) {
//     let temp_series = [];
//     // console.log('key',key)
//     arr2.forEach(function (obj) {
//       var m = obj[key];
//       // console.log("parseInt(obj[key])",obj[key])
//       temp_series.push(m);
//     });
//     arr_res.push({ name: element_Map.get(key), type: "bar", stack: "true", data: temp_series });
//   }

//   // console.log("temp_series", temp_series);

//   // z的赋值
//   arr_res.forEach(function (obj) {
//     // console.log(typeof(obj[key]));
//     let n = obj.name;
//     // console.log(n);
//     z.push(n);
//   });
//   // console.log("zzz", z);

//   //全局变量赋值
//   // SpecifiedElementList.locationnumber = x;
//   // SpecifiedElementList.locationtext = y;
//   // SpecifiedElementList.pelements = z;

//   // SpecifiedElementList.series = arr_res;
//   // SpecifiedElementList.push(x);
//   // SpecifiedElementList.push(y);
//   // SpecifiedElementList.push(z);
//   SpecifiedElementList[0] = x;
//   SpecifiedElementList[1] = y;
//   SpecifiedElementList[2] = z;
//   SpecifiedElementList[3] = res_point_num;

//   // AllGroundData[3] = SpecifiedElementList
//   // console.log("final Location",arr_res)

//   if (SpecifiedElementList) {

//     this.body = {
//       success: true,
//       res: SpecifiedElementList,
//       res1: arr_res,
//       msg: '获取成功'
//     }
//   } else {
//     this.body = {
//       success: false,
//       msg: '获取失败'
//     }
//   }
// };




module.exports = GroundInfo_Controller
