const AllProjectDataModel = require('../../models/table/projectInfo.js')
const AllMap = require('../../models/common/Map.js')
const jwt = require('jsonwebtoken')
const secret = 'shu-project'
var areaMap

AllMap.then(data => {
  areaMap = data.area_Map
})

// const areaMap = new Map([['0001', '静安区'], ['0002', '长宁区'], ['0003','宝山区']])

class ProjectInfo_Controller {

  static async getProjectInfo(ctx) {

    const token = ctx.header['shu-token']
    let roles
    let project_owner
    if (token) {
      try {
        let playload = await jwt.verify(token, secret)
        console.log('playload', playload)
        roles = playload.roles
        project_owner = playload.project_owner.split('、')
      } catch (err) {
        console.log(err)
      }
    } else {
      return
    }

    let res = await AllProjectDataModel.getAllProjectData(roles, project_owner)
    let AllProjectData = res.map(item => {
      return item = item.dataValues
    })
    let project_obj = {}
    let project_arr = []
    AllProjectData.forEach((item, index) => {
      if (item.project_area in project_obj) {
        project_obj[item.project_area].push({
          value: item.project_num,
          label: item.project_name
        })
      } else {
        project_obj[item.project_area] = []
        project_obj[item.project_area].push({
          value: item.project_num,
          label: item.project_name
        })
      }
    })
    console.log('project_obj', project_obj)
    console.log('areaMap', areaMap)
    for (let key in project_obj) {
      project_arr.push({
        value: key,
        label: areaMap.get(key),
        children: project_obj[key]
      })
    }
    // console.log('project_arr', project_arr)
    if (AllProjectData) {

      ctx.body = {
        success: true,
        res: project_arr,
        msg: '获取成功'
      }
    } else {
      ctx.body = {
        success: false,
        msg: '获取失败'
      }
    }
  }

  static async getPointOptions(ctx) {
    let project_num = ctx.params.project_num
    let res = await AllProjectDataModel.getPoint(project_num)
    let PointOptions = res.map(item => {
      return item = item.dataValues.point_num
    }).map(item => {
      return { value: item }
    })

    // console.log('PointOptions', PointOptions)
    PointOptions.unshift({ value: '0', label: '全部' })

    if (res) {
      ctx.body = {
        success: true,
        res: PointOptions,
        msg: '获取成功'
      }
    } else {
      ctx.body = {
        success: false,
        msg: '获取失败'
      }
    }
  }

  static async getMarkerList(ctx) {
    let project_num = ctx.params.project_num
    let res = await AllProjectDataModel.getPointMarkerList(project_num)
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
}

module.exports = ProjectInfo_Controller
