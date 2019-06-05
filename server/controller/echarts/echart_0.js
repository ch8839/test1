const AllEchartDataModel = require('../../models/echarts/echart_0.js')
const sample_lab_ground_info_model = require('../../models/echarts/echart_0.js')
const AllMap = require('../../models/common/Map.js')

var reference, element_Map, unit_Map

AllMap.then(data => {
  element_Map = data.element_Map
  reference = data.reference_17_ground_Map
  // console.log(element_Map)
})

class Echart_0_Controller {
  /* 获取类型(assess_type)选择器数据 */
  static async getRawAssessData(ctx) {
    let project_num = ctx.params.project_num;
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
  static async getTableItemsByPN(ctx) {
    const project_num = ctx.params.project_num;
    let AllItemsData = await AllEchartDataModel.getAllTableItemData(project_num);
    let AllPointIntroData = await AllEchartDataModel.getSpecifiedPointIntro();
    let res_AllPointIntroData = AllPointIntroData.map((item) => {
      return item = {
        point_num: item.point_num,
        point_intro: item.point_intro
      }
    })
    let res_AllItemsData = AllItemsData.map(item => {
      if (item.attention !== null) {
        let temp_attention = item.attention.split(",")
        temp_attention = temp_attention.map((element)=>{
          return element = element_Map.get(element)
        })
        item.attention = temp_attention
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
    // let temp_attention = [];
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
          let temp_attention = res_AllItemsData[o].attention;
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
        if (res_AllItemsData[o].attention !== null) {
          filtered_res_AllItemsData[p].attention = filtered_res_AllItemsData[p].attention.concat(res_AllItemsData[o].attention)
        }
      }
    }

    filtered_res_AllItemsData.forEach((item) => {
      item.attention = [...new Set(item.attention)]
      if (item.attention.length == 0) {
        item.attention.push("无")
        item.status = "无超标元素"
      } else {
        item.status = "需要治理"
      }
      res_AllPointIntroData.find((element) => {
        if (item.point_num == element.point_num) {
          item.point_name = element.point_intro
        }
      })
    })

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

  /* getWaterTableItemsByPN */
  static async getWaterTableItemsByPN(ctx) {
    const project_num = ctx.params.project_num;
    let AllItemsData = await AllEchartDataModel.getAllWaterTableItemData(project_num);
    let AllPointIntroData = await AllEchartDataModel.getSpecifiedPointIntro();
    let res_AllPointIntroData = AllPointIntroData.map((item) => {
      return item = {
        point_num: item.point_num,
        point_intro: item.point_intro
      }
    })
    let res_AllItemsData = AllItemsData.map(item => {
      if (item.attention !== null) {
        let temp_attention = item.attention.split(",")
        temp_attention = temp_attention.map((element)=>{
          return element = element_Map.get(element)
        })
        item.attention = temp_attention
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
    // let temp_attention = [];
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
          let temp_attention = res_AllItemsData[o].attention;
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
        if (res_AllItemsData[o].attention !== null) {
          filtered_res_AllItemsData[p].attention = filtered_res_AllItemsData[p].attention.concat(res_AllItemsData[o].attention)
        }
      }
    }

    filtered_res_AllItemsData.forEach((item) => {
      item.attention = [...new Set(item.attention)]
      if (item.attention.length == 0) {
        item.attention.push("无")
        item.status = "无超标元素"
      } else {
        item.status = "需要治理"
      }
      res_AllPointIntroData.find((element) => {
        if (item.point_num == element.point_num) {
          item.point_name = element.point_intro
        }
      })
    })

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

  /* 计算sample_lab_ground_info的attention */
  static async ComputeLabAttention(ctx) {

    let Alldata = await sample_lab_ground_info_model.getAlldata()
    let res = Alldata.map(item => {
      return item = item.dataValues
    })

    for (let i of res) {  //遍历对象数组
      var attention = []
      let temp_attention = null
      for (let item in i) { //遍历key
        // console.log("我是item", item)   
        // console.log("reference[item]", reference.get(item))
        // if (element_Map.get(item) && i[item] > reference.get(item) && (i[item] - reference.get(item)) > chazhi) {
        if (element_Map.get(item) && i[item] > reference.get(item)) {
          attention.push(item)
        }
      }
      if(attention.length == 0){
        // temp_attention = null
        // let data = await sample_lab_ground_info_model.UpdateAttention(i.sample_num, null)
      }else{
        temp_attention = attention.join(",")
        // temp_attention.split(",")
        let data = await sample_lab_ground_info_model.UpdateAttention(i.sample_num, temp_attention)
      }
    }
  }

  /* 计算sample_lab_water_info的attention */
  static async ComputeLabWaterAttention(ctx) {

    let Alldata = await sample_lab_ground_info_model.getAllWaterData()
    let res = Alldata.map(item => {
      return item = item.dataValues
    })

    for (let i of res) {  //遍历对象数组
      var attention = []
      let temp_attention = null
      for (let item in i) { //遍历key
        if (element_Map.get(item) && i[item] > reference.get(item)) {
          attention.push(item)
        }
      }
      if(attention.length == 0){
      }else{
        temp_attention = attention.join(",")
        // temp_attention.split(",")
        let data = await sample_lab_ground_info_model.UpdateWaterAttention(i.sample_num, temp_attention)
      }
    }
  }

}
module.exports = Echart_0_Controller