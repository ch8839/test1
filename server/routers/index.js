const userController = require('../controller/user.js')
const dataController = require('../controller/data.js')
const router = require('koa-router')();

// router.get('/user' , userController.getUserInfo)
router.get('/student/:id' , userController.getStudentInfo)
router.post('/user/login' , userController.login)
router.get('/user/info' , userController.getLoginInfo)
router.get('/data/getMarkerInfo' , dataController.getMarkerInfo)
router.post('/table/getTableData' , dataController.getTableData)
router.post('/table/updateTable' , dataController.updateTable)
router.post('/table/deleteData' , dataController.deleteTableData)
router.post('/table/addTableData' , dataController.addTableData)
module.exports= router;