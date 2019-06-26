const UserManageModel = require('../../models/user/usermanage.js')

class UserManage_Controller {

  static async getUserList(ctx) {
    let res = await UserManageModel.getUserList()
    let userList = res.map(item => {
      return item = item.dataValues
    })
    if (userList) {
      ctx.body = {
        success: true,
        res: userList,
        msg: '获取成功'
      }
    } else {
      ctx.body = {
        success: false,
        res: '',
        msg: '获取失败'
      }
    }
  }

  // static async getProjectList(ctx) {
  //   let res = await UserManageModel.getProjectList()
  //   let projectList = res.map(item => {
  //     return item = item.dataValues
  //   })

  //   if (projectList) {
  //     ctx.body = {
  //       success: true,
  //       res: projectList,
  //       msg: '获取成功'
  //     }
  //   } else {
  //     ctx.body = {
  //       success: false,
  //       res: '',
  //       msg: '获取失败'
  //     }
  //   }
  // }


  static async addUser(ctx) {
    let data = ctx.request.body
    console.log('data1', data)
    try {
      let res = await UserManageModel.addUser(data)
      ctx.body = {
        code: 200,
        msg: `新增成功`
      }
    } catch (err) {
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: `新增失败`,
        data: err
      }
    }
  }


  static async updateUser(ctx) {
    let id = ctx.params.id
    let data = ctx.request.body
    console.log('data1', data)
    try {
      let res = await UserManageModel.updateUser(id, data)
      ctx.body = {
        code: 200,
        msg: `修改成功`
      }
    } catch (err) {
      ctx.response.status = 500;
      ctx.body = {
        code: 500,
        message: `修改失败`,
        data: err
      }
    }
  }

  static async deleteUser(ctx) {
    let id = ctx.params.id

    try {
      let res = await UserManageModel.deleteUser(id)
      ctx.body = {
        code: 200,
        msg: '删除成功'
      }
    } catch (err) {
      ctx.response.status = 500
      ctx.body = {
        code: 500,
        msg: '删除失败'
      }
    }
  }
}

module.exports = UserManage_Controller
