const tableModel = require('../../models/test/data.js');

const getTableData = async function (ctx) {
  const res = await tableModel.getAllTableData()
  if (res) {
    ctx.body = {
      success: true,
      res: res,
      msg: '获取成功'
    }
  } else {
    ctx.body = {
      success: false,
      msg: '获取失败'
    }
  }
}

const updateTable = async function (ctx) {
  console.log(ctx.request.body)
  let id = ctx.request.body.id
  let data = ctx.request.body

  const res = await tableModel.updateTable(id, data)

  if (res) {
    ctx.body = {
      success: true,
      res: res,
      msg: '获取成功'
    }
  } else {
    ctx.body = {
      success: false,
      msg: '获取失败'
    }
  }
}

const deleteTableData = async function (ctx) {
  let id = ctx.request.body.id
  const res = await tableModel.deleteData(id)

  if (res) {
    ctx.body = {
      success: true,
      res: res,
      msg: '获取成功'
    }
  } else {
    ctx.body = {
      success: false,
      msg: '获取失败'
    }
  }
}

const addTableData = async function (ctx) {
  const data = ctx.request.body.data
  const res = await tableModel.addData(data)

  if (res) {
    ctx.body = {
      success: true,
      res: res,
      msg: '获取成功'
    }
  } else {
    ctx.body = {
      success: false,
      msg: '获取失败'
    }
  }
}


module.exports = {
  getTableData,
  updateTable,
  deleteTableData,
  addTableData
}
