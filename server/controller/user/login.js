const UserModel = require('../../models/user/login.js')
const jwt = require('jsonwebtoken')
const secret = 'shu-project'
const roles_Map = new Map([[1, 'admin'], [2, 'tourist']])

class User_Controller {

	static async login(ctx) {
		const req_userInfo = ctx.request.body
		let userInfo = await UserModel.login(req_userInfo.username)
		if (userInfo) {
			if (userInfo.password == req_userInfo.password) {
				const userToken = {
					id: userInfo.id,
					username: userInfo.username,
					roles: userInfo.roles,
					project_owner: userInfo.project_owner,
					avatar: userInfo.avatar
				}

				// 签发token
				const token = jwt.sign(userToken, secret, { expiresIn: 60*60*3 })

				ctx.body = {
					code: 200,
					success: true,
					token: token,
					msg: '获取成功'
				}
			} else {
				ctx.body = {
					code: 412,
					success: false,
					msg: '密码不正确'
				}
			}
		} else {
			ctx.body = {
				code: 413,
				success: false,
				msg: '用户不存在'
			}
		}
	}

	static async getUserInfo(ctx) {
		const token = ctx.header['shu-token']

		if (token) {
			try {
				let playload = await jwt.verify(token, secret)
				console.log('playload', playload)
				let user = {
					name: playload.username,
					roles: [playload.roles],
					avatar: playload.avatar
				}
				ctx.body = {
					code: 200,
					success: true,
					res: user,
					msg: '获取成功'
				}
			} catch{
				ctx.body = {
					code: 50014,
					success: true,
					res: user,
					msg: '获取成功'
				}
			}

		} else {
			ctx.body = {
				success: false,
				msg: '获取token失败'
			}
		}

	}


}

module.exports = User_Controller
