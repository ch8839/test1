const AllProjectDataModel = require('../../models/map/projectInfo3.js')
const AllGroundDataModel = require('../../models/map/groundInfo2.js')
const ReferenceDataMOdel = require('../../models/map/reference.js')
const ElementDataModel = require('../../models/map/elementInfo.js')
const PointInfoModel = require('../../models/map/pointInfo.js')
const sample_detector_ground_info_model = require('../../models/map/sample_detector_ground_info.js')
const common_model = require('../../models/common/Map.js')
const CircleModel = require('../../models/map/circle.js')
const jwt = require('jsonwebtoken')
const UserModel = require('../../models/map/login.js')
var reference, element_Map

common_model.then(data => {
  reference = data.reference_17_ground_Map
  element_Map = data.element_Map
})





const getpointMarkerInfo = async function (ctx) {
  let res = await PointInfoModel.getpointMarkerInfo()
  let res2 = res.map(item => {
    return item = item.dataValues
  })
  let res3 = res2.map(item => {

    delete item.point_address
    delete item.remarks
    delete item.simple_count
    delete item.detail_count
    delete item.fixed_count

    return item = item
  })

  res8 = []
  for (let i of res3) {
    let res5 = await PointInfoModel.getProjectnumByPointnum(i.point_num)

    let res6 = await AllProjectDataModel.getProjecttypeByProjectnum(res5)
    //res6是projecttype
    res8.push(res6)
  }

  for (let i of res3) {

    i.project_type = res8[res3.indexOf(i)]

  }

  ctx.body = {
    success: true,
    res: res3,
    msg: '获取成功'
  }


}

// 在地图页面上获得所有不同区域和地块评估类型的项目体信息以及该项目体的异常污染值
const getMarkerInfo = async function (ctx) {
  let res = await AllProjectDataModel.getAllProjectData()//得到所有的数据
  let groundnumtopoint = []
  let project_numberList = []
  let data = []
  // in -key of -value
  for (let item of res) {//遍历数据
    let ground_name_point = await AllGroundDataModel.getPointnumByGroundnum(item.project_num)
    // 遍历数据，取出project_num得到对应监测点位如{‘a’:['b','c','d']}
    data.push(item.dataValues)
    groundnumtopoint.push(ground_name_point)
    project_numberList.push(item.project_num)
  }

  // console.log(111,data) //data放清洗完毕的所有数据
  //project_num对应point-num存储在 groundnumtopoint project_num存储在project_numberList中

  for (let i of data) {
    if (!i.all_count) {//如果数据库project_info中all_count不存在，则计算一下对应每个监测点的count，有的话就不用计算了
      item1 = i.project_num
      list = groundnumtopoint[project_numberList.indexOf(item1)][item1]//list中存储着监测点位编号是一个集合
      var countall = 0
      var simple_count = 0
      var detail_count = 0
      var fixed_count = 0
      if (list) {
        for (let item of list) {//item存放着监测点位的编号
          var count = 0
          let resph = await AllProjectDataModel.getPhData(item)
          let PHdata = resph.map(item => {
            return item = item.dataValues
          })

          for (let item of PHdata) {//遍历检测点位不同深度的数据为item
            for (let x in item) {
              if (item[x] && reference.get(i) && (item[x] > reference.get(i))) {
                count++;
                countall++;
                switch (item.assess_type) {
                  case 1:
                    simple_count += 1
                    break;
                  case 2:
                    detail_count += 1
                    break;
                  case 3:
                    fixed_count += 1
                    break;
                }
              }
            }
            const res = await ElementDataModel.UpdateCount(item.point_num, item.sample_depth, count)
            count = 0
            //将违规数目更新至ground_info和real_time_info中
          }
        }
        //从这里开始结束循环，计算出一个地块所有检测点位的count
        const res2 = await AllProjectDataModel.UpdatedifferentCount(item1, simple_count, detail_count, fixed_count, countall)
        //将各种不同类型的数目更新至project_info中
      }
    }

  }//此处循环结束
  const token = ctx.header['shu-token']
  const secret = 'shu-project'
  if (token) {
    console.log(11, token)
    var playload = await jwt.verify(token, secret)
    console.log('playload', playload)
    var project_num = await UserModel.getProjectnumByUser(playload.username)
  }
  var project_num_List = project_num.split('、')
  console.log(11111111,project_num_List)

  const res11 = await AllProjectDataModel.getDataByProjectnum(project_num_List)
  ctx.body = {
    success: true,
    res: res11,
    msg: '获取成功'
  }

}




const getGroundList = async function (ctx) {
  // const element_Map = await getUnit() //通过这种方式每回请求都要执行生成Map映射，所以直接定义全局变量，并立即执行生成Map映射函数，之后取映射时不用再执行
  const project_num = ctx.params.project_num
  // console.log(4,project_num)
  let ground_name_point = await AllGroundDataModel.getPointnumByGroundnum(project_num)
  // console.log(5,ground_name_point)
  var id = 0
  var Alldata = []
  for (let item of ground_name_point[project_num]) {
    // 取出监测点位编号，然后开始统计attention元素的值
    // console.log(6,item)
    let attentionlist = await sample_detector_ground_info_model.getAttentionByPointnum(item)
    // console.log(7,attentionlist)
    var attention1 = Array.from(attentionlist)
    var attention = []
    let Intro = await PointInfoModel.getIntroByPointnum(item)
    var attention1_List = attention1[0].split(',')

    for (let i of attention1_List) {
      if (i != -1) {//不要把null当作attentionde
        console.log(112, i)

        attention.push(element_Map.get(i))
      }
    }
    Alldata.push({ id: ++id, point_num: item, attention: attention, introduction: Intro })
  }
  if (Alldata) {

    ctx.body = {
      success: true,
      res: Alldata,
      msg: '获取成功'
    }
  } else {
    ctx.body = {
      success: true,
      res: [],
      msg: '获取失败'
    }
  }
};

const getCircleByProjectnum = async function (ctx) {
  const project_num = ctx.params.project_num
  let res4 = await CircleModel.getCircleByProjectnum(project_num)
  var res = {}
  res['path'] = res4
  var res2 = []
  res2.push(res)
  ctx.body = {
    success: true,
    res: res2,
    msg: '获取成功'
  }
    ;
}
const getMoreDataByPointnum = async function (ctx) {
  const point_num = ctx.params.point_num
  var list = []
  var id = 1

  // 拿到Projectnum和Intro
  let Projectnum = await PointInfoModel.getProjectnumByPointnum(point_num)
  let Intro = await PointInfoModel.getIntroByPointnum(point_num)


  let res = await sample_detector_ground_info_model.getDataByPointnum(point_num)
  let res2 = res.map(item => {
    return item = item.dataValues
  })
  let res3 = await sample_detector_ground_info_model.getAttentionByPointnum(point_num)

  for (let i of res3) {//遍历每个attention元素 为i
    let res4 = await sample_detector_ground_info_model.getmaxbyattention(point_num, i)
    let res5 = res4.map(item => {
      return item = item.dataValues
    })
    var max_value = 0
    var count = 0
    for (let x of res5) {
      if (x[i] > max_value) {
        max_value = x[i]
        count += 1
      }
    }

    if (max_value != 0) {
      list.push({ id: id++, count: count, max_value: max_value, element: element_Map.get(i), Project_num: Projectnum, Intro: Intro, point_num: point_num })
    }
  }



  if (list) {
    ctx.body = {
      success: true,
      res: list,
      msg: '获取成功'
    }
  } else {
    ctx.body = {
      success: true,
      res: [],
      msg: '获取失败'
    }
  }

};


const getExcel = async function (ctx) {


  let res3 = ctx.request.body


  console.log('res3', res3)

  // if (list) {
  //   ctx.body = {
  //     success: true,
  //     res: list,
  //     msg: '获取成功'
  //   }
  // } else {
  //   ctx.body = {
  //     success: true,
  //     res: [],
  //     msg: '获取失败'
  //   }
  // }

};

module.exports = {
  getMarkerInfo,
  getpointMarkerInfo,
  getGroundList,
  getMoreDataByPointnum,
  getCircleByProjectnum,
  getExcel
}
