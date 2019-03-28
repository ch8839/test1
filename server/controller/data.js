const markerModel = require('../models/data.js')
const tableModel = require('../models/data.js');

const getMarkerInfo = async function () {
  const markerInfo = await markerModel.getAllMarkerInfo()
  if (markerInfo) {
    // let markerInfoList = markerInfo.map((item,index)=>{
    //     item.position = [item.lng, item.lat]
    //     delete item.id
    //     delete item.lng
    //     delete item.lat
    //     return item
    // })  
    this.body = {
      success: true,
      res: markerInfo,
      msg: '获取成功'
    }
  } else {
    this.body = {
      success: false,
      msg: '获取失败'
    }
  }
}

const getTableData = async function () {
  const res = await tableModel.getAllTableData()
  if (res) {
    this.body = {
      success: true,
      res: res,
      msg: '获取成功'
    }
  } else {
    this.body = {
      success: false,
      msg: '获取失败'
    }
  }
}

const updateTable = async function () {
  console.log(this.request.body)
  let id = this.request.body.id
  let data = this.request.body

  const res = await tableModel.updateTable(id, data)

  if (res) {
    this.body = {
      success: true,
      res: res,
      msg: '获取成功'
    }
  } else {
    this.body = {
      success: false,
      msg: '获取失败'
    }
  }
}

const deleteTableData = async function () {
  let id = this.request.body.id
  const res = await tableModel.deleteData(id)

  if (res) {
    this.body = {
      success: true,
      res: res,
      msg: '获取成功'
    }
  } else {
    this.body = {
      success: false,
      msg: '获取失败'
    }
  }
}

const addTableData = async function () {
  const data = this.request.body.data
  const res = await tableModel.addData(data)

  if (res) {
    this.body = {
      success: true,
      res: res,
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
  getMarkerInfo,
  getTableData,
  updateTable,
  deleteTableData,
  addTableData
}
