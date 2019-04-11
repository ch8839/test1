const userController = require('../controller/user.js')
const dataController = require('../controller/data.js')

const projectInfo_Controller = require('../controller/projectInfo.js')
const projectInfo_Controller2 = require('../controller/projectInfo2.js')
const groundInfo_Controller = require('../controller/groundInfo.js')
const echart_Controller = require('../controller/echart.js')
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

router.get('/project/getAll' , projectInfo_Controller.getAll)

router.post('/ground/getGroundList' , groundInfo_Controller.getGroundList)
router.get('/ground/getAllHistoryData/:point_num' , groundInfo_Controller.getAllHistoryData)

router.post('/ground/getSpecifiedElementList' , groundInfo_Controller.getSpecifiedElementList)

router.get('/echart/getAllPieData/:point_num' , echart_Controller.getAllPieData) 
router.get('/echart/getPieDataName/:point_num' , echart_Controller.getPieDataName)

router.get('/project/getMapPhByName/:ground_name' , projectInfo_Controller2.getMapPhByName)
router.get('/project/getMapPhByID/:ground_number' , projectInfo_Controller2.getMapPhByID)
module.exports= router;