const AllProjectDataModel = require('../../models/map/projectInfo3.js')
const AllGroundDataModel = require('../../models/map/groundInfo2.js')
const ReferenceDataMOdel = require('../../models/map/reference.js')
const ElementDataModel = require('../../models/map/elementInfo.js')


const getMarkerInfo = async function (ctx) {
  let res = await AllProjectDataModel.getAllProjectData()//得到所有的数据
  let reference = await ReferenceDataMOdel.getReferenceData()//得到所有的参考值数据
  let groundnumtopoint = []
  let ground_numberList = []
  let data = []

  for (let item of res) {//遍历数据
    let ground_name_point = await AllGroundDataModel.getPointnumByGroundnum(item.ground_num)
    //  遍历数据，取出ground_num得到对应监测点位如{‘a’:['b','c','d']}
    data.push(item.dataValues)
    groundnumtopoint.push(ground_name_point)
    ground_numberList.push(item.ground_num)
  }

  // console.log(data)  //data放清洗完毕的所有数据
  //groun_num对应point-num存储在 groundnumtopoint   ground_num存储在ground_numberList中

  for (let i of data) {
    if (!i.count) {//如果count不存在，则计算一下，有的话就不用计算了
      item1 = i.ground_num
      list = groundnumtopoint[ground_numberList.indexOf(item1)][item1]//list中存储着监测点位编号是一个数组
      var countall = 0
      if (list) {
        for (let item of list) {//item存放着监测点位的编号
          var count = 0
          let resph = await AllProjectDataModel.getPhData(item)
          // console.log(11,resph)
          let PHdata = resph.map(item => {
            return item = item.dataValues
          })

          //  console.log(11,PHdata)
          for (let item of PHdata) {//遍历检测点位不同深度的数据为item
            // console.log(11,item)
            for (let x in item) {
              if (item[x] && reference[x] && (item[x] > reference[x])) {
                count++;
                countall++;
              }
            }
            const res = await ElementDataModel.UpdateCount(item.point_num, item.point_depth, count)
            const res1 = await AllGroundDataModel.UpdateCount(item.point_num, item.point_depth, count)
            //将违规数目更新至ground_info和real_time_info中
          }
          //  console.log(item)
          // const res = await ElementDataModel.UpdateCount(item.point_num,item.point_depth, count)   
        }
        //从这里开始结束循环，计算出一个地块所有检测点位的count
        // console.log(countall)
        // console.log(item1)
        const res2 = await AllProjectDataModel.UpdateCount(item1, countall)
        //将违规数目更新至project_info中
      }
      // console.log(s)
    }

  }//此处循环结束

  let Alldata = await AllProjectDataModel.getAllProjectData()//得到所有的数据
  ctx.body = {
    success: true,
    res: Alldata,
    msg: '获取成功'
  }
}

const getMarkerList = async function (ctx) {
  const ground_number = ctx.params.ground_number

  let res = await AllGroundDataModel.getPoingLocationByGroundnum(ground_number)
  // res.push(ground_name_point[ground_number])
  ctx.body = {
    success: true,
    res: res,
    msg: '获取成功'
  }
}

const getMapPhByID = async function (ctx) {
  const ground_number = ctx.params.ground_number  //获取变量point_num
  let res = await AllProjectDataModel.getDepthData(ground_number)
  let reference = await ReferenceDataMOdel.getReferenceData()//得到所有的参考值数据
  //  console.log(11,reference.PH)
  if (res) {
    let depth = res.map(item => {
      return item = item.dataValues.point_depth//得到深度数据point_depth
    })

    let point_num = res.map(item => {
      return item = item.dataValues.point_num//得到检测点位point_num
    }
    )
    //ground_number得到的深度数据放在了depth中[1.3 1.3 1.5]
    //ground_number得到的监测点编号放在了point_num中[ '31010720190001001', '31010720190001002', '31010720190001003' ]

    let resph = await AllProjectDataModel.getPhData(point_num)
    let PHdata = resph.map(item => {
      return item = item.dataValues
    })

    let PHdataList = []
    //循环遍历数据库返回的某监测点位所有的历史数据数组，然后改造成前端需要的格式
    PHdata.forEach((item) => {
      //let in 遍历数组元素即一个包含id,date,point_num还有各种元素值的对象，然后把这些元素对应的值，参考值，时间，是否受污染push到HistoryLists数组中

      for (let key in item) {
        if (key != 'id') {
          if (item[key] && reference[key]) {
            if (item[key] > reference[key]) {

              PHdataList.push({ point_number: item['point_num'], depth: depth[point_num.indexOf(item['point_num'])], element: key, value: item[key], reference: reference[key] })
            }
          }
        }
      }
    })
    console.log('PHdataList', PHdataList)
    ctx.body = {
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


module.exports = {
  getMarkerInfo,
  getMarkerList,
  getMapPhByID

}
