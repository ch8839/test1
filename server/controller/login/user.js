const userModel = require('../../models/login/users.js');
// const jwt = require('jsonwebtoken');
// const util = require('util')
// const verify = util.promisify(jwt.verify)

const getLoginInfo = async function (ctx) {
  console.log(ctx.header)
  const token = ctx.header['x-token']
  console.log("后端获取token", token)
  if (token) {
    // let payload

    //   const secret = 'shumanagement' // 指定密钥
    //   // 解密payload，获取用户名和ID
    //   payload = await jwt.verify(token.split(' ')[1], secret)
    //   console.log("payload",payload)
    let user = token.split('----')
    user = {
      id: user[0],
      username: user[1],
    }
    ctx.body = {
      success: true,
      res: user,
      msg: '查询成功'
    }
  } else {
    ctx.body = {
      msg: 'Token没有，查询失败'
    }
  }

}

const getStudentInfo = async function (ctx) {
  const id = ctx.params.id
  const student = await userModel.getStudentById(id)
  if (student) {
    ctx.body = {
      success: true,
      res: student,
      msg: '获取成功'
    }
  } else {
    ctx.body = {
      success: false,
      msg: '获取失败'
    }
  }
}

const login = async function (ctx) {
  const form = ctx.request.body
  const res = await userModel.findUserByName(form)
  console.log(res)
  if (res) {
    if (res.password == form.password) {
      //   const userToken = {
      //     username: res.username,
      //     id: res.id
      //   }
      const userToken = res.id + '----' + res.username

      //   const secret = 'shumanagement' // 指定密钥
      //   // 签发token
      //   const token = jwt.sign(userToken, secret, {
      //     expiresIn: '1h'
      //   });

      ctx.body = {
        code: 200,
        data: {
          msg: "登录成功！",
          user_id: res.id,
          user_name: res.username
        },
        token: userToken,
      }
    } else {
      ctx.body = {
        code: 412,
        data: {
          msg: "密码错误"
        }
      }
    }
  } else {
    ctx.body = {
      code: 403,
      data: {
        msg: "用户不存在"
      }
    }
  }
}

module.exports = {
  getStudentInfo,
  login,
  getLoginInfo
}
