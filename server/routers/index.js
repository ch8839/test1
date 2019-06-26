const Router = require('koa-router')
const router = new Router()

//登陆模块
const User_Controller = require('../controller/user/login.js')

const UserManage_Controller = require('../controller/user/usermanage.js')

//table模块


//ros模块
const RosHistory_Controller = require('../controller/ros/history.js')
const RosTest_Controller = require('../controller/ros/test.js')

//user部分
router.post('/user2/login' , User_Controller.login)
router.get('/user2/info/:token' , User_Controller.getUserInfo)
router.get('/user2/getUserList' , UserManage_Controller.getUserList)
// router.get('/user2/getProjectList' , UserManage_Controller.getProjectList)

router.post('/user2/addUser' , UserManage_Controller.addUser)
router.post('/user2/updateUser/:id' , UserManage_Controller.updateUser)
router.delete('/user2/deleteUser/:id' , UserManage_Controller.deleteUser)

//ros部分
router.post('/getHistoryData', RosHistory_Controller.getHistoryData)

router.get('/test_get', RosTest_Controller.test_get)
router.post('/test_post', RosTest_Controller.test_post)

module.exports= router;