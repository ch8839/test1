const AllProjectDataModel = require('../../models/map/projectInfo3.js')
const AllGroundDataModel = require('../../models/map/groundInfo2.js')
const ReferenceDataMOdel = require('../../models/map/reference.js')
const ElementDataModel = require('../../models/map/elementInfo.js')
const PointInfoModel = require('../../models/map/pointInfo.js')
const sample_detector_ground_info_model = require('../../models/map/sample_detector_ground_info.js')
const addTableData = async function (ctx) {


  data = ctx.request.body
  if (data.hasOwnProperty('sample_num') && data.hasOwnProperty('point_num') && data.hasOwnProperty('project_num')) {
    console.log(22)
    let reference = await ReferenceDataMOdel.getReferenceData()//得到所有的参考值数据

    var count = 0
    var chazhi = 0
    var attention = 0
    for (let i in data) {
      if (data[i] && reference[i] && (data[i] > reference[i])) {
        count += 1
        if ((data[i] - reference[i]) > chazhi) {
          chazhi = data[i] - reference[i]
          attention = i

        }
      }

    }
    //  给新数据中添加count和需要注意的元素
    data['count'] = count
    data['attention'] = attention
    //将数据添加到数据库中
    const res = await sample_detector_ground_info_model.AddNewData(data)
    type = data.assess_type
    project_num = data.project_num
    //   接下来要更新project_info里的count
    // res3拿到count的数目
    let res3 = await AllProjectDataModel.getCountByProjectnum(data.project_num)


    switch (type) {
      case '1':
        res3.simple_count += count
        res3.all_count += count
        let res2 = await AllProjectDataModel.UpdatedifferentCount(data.project_num, res3.simple_count, res3.detail_count, res3.fixed_count, res3.all_count)
        break;
      case '2':
        res3.detail_count += count
        res3.all_count += count
        let res4 = await AllProjectDataModel.UpdatedifferentCount(data.project_num, res3.simple_count, res3.detail_count, res3.fixed_count, res3.all_count)//得到所有的参考值数据
        break;
      case '3':
        res3.fixed_count += count
        res3.all_count += count
        let res5 = await AllProjectDataModel.UpdatedifferentCount(data.project_num, res3.simple_count, res3.detail_count, res3.fixed_count, res3.all_count)//得到所有的参考值数据
        break;

    }
  }

  ctx.body = {
    success: true,
    res: ctx.request.body,
    msg: '获取成功'
  }
}



const test = async function (ctx) {
  data = ctx.request.body
  var fs = require('fs');
  var mysql = require('mysql');
  // 数据库信息
  var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'helpful',
  database: 'tank'
  });
  var res3json = []
  data.forEach((item, index) => {
  var list = []
  for (let i in item) {
  list.push(item[i])
  }
  res3json.push(list)
  })
  
  var sql = "INSERT INTO sample_detector_ground_info(`id`,`sample_num`,`PH`,`arsenic`,`cadmium`,`copper`) VALUES ?";
  connection.query(sql, [res3json], function (err, rows, fields) {
  if (err) {
  console.log('INSERT ERROR - ', err.message);
  return;
  }
  console.log("INSERT SUCCESS");
  })
  
  if(ctx.request.body){
    ctx.body = {
    success: true,
    res: '获取成功',
    msg: '获取成功'
    }
    }
    else{
    ctx.body = {
    success: true,
    res: '获取失败',
    msg: '获取失败'
    }
  }
  
  }

module.exports = {

  addTableData,
  test,

}
