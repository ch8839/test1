const userController = require('../controller/user.js')
const dataController = require('../controller/data.js')

const projectInfo_Controller = require('../controller/projectInfo.js')
const projectInfo_Controller2 = require('../controller/projectInfo2.js')
const groundInfo_Controller = require('../controller/groundInfo.js')
const echart_Controller = require('../controller/echart.js')
const getpoint=require('../controller/getpoint.js')

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
router.get('/ground/getMarkerList/:ground_num' , groundInfo_Controller.getGroundMarkerList)
router.post('/ground/getGroundList' , groundInfo_Controller.getGroundList)
router.post('/ground/getAllHistoryData' , groundInfo_Controller.getAllHistoryData)

router.post('/ground/getSpecifiedElementList' , groundInfo_Controller.getSpecifiedElementList)

//echarts部分
router.get('/echarts/getAll' , echart_Controller.getAll)
router.post('/echarts/getGroundList' , echart_Controller.getGroundList)
router.post('/echarts/getSpecifiedElementList' , echart_Controller.getSpecifiedElementList)
// router.get('/echart/getAllPieData/:point_num' , echart_Controller.getAllPieData) //新加入的echart的数据路由
// router.get('/echart/getPieDataName/:point_num' , echart_Controller.getPieDataName)//只有数据名称的路由
router.get('/echarts/getRadarRealTimeValue/:point_num' , echart_Controller.getRadarRealTimeValue)
router.get('/echarts/getRadarData/:id' , echart_Controller.getRadarData)


router.get('/project/getMapPhByID/:ground_number' , projectInfo_Controller2.getMapPhByID)
router.get('/data/getMarkerList/:ground_number',getpoint.getMarkerList)
module.exports= router;