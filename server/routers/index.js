const Router = require('koa-router')
const router = new Router()

//test模块
const userController = require('../controller/login/user.js')
const testController = require('../controller/test/test.js')

//table模块
const projectInfo_Controller = require('../controller/table/projectInfo.js')
const groundInfo_Controller = require('../controller/table/groundInfo.js')

//echarts模块
const echart_Controller = require('../controller/echarts/echart.js')

//map模块
const mapController = require('../controller/map/data.js')
const ComputeController = require('../controller/map/compute.js')
const dataController = require('../controller/map/adddata.js')


//测试部分
router.get('/student/:id' , userController.getStudentInfo)
router.post('/user/login' , userController.login)
router.get('/user/info' , userController.getLoginInfo)

router.post('/table/getTableData' , testController.getTableData)
router.post('/table/updateTable' , testController.updateTable)
router.post('/table/deleteData' , testController.deleteTableData)
router.post('/table/addTableData' , testController.addTableData)

//table部分
//router.get('/project/getAll' , projectInfo_Controller.getAll)
//router.get('/ground/getMarkerList/:ground_num' , groundInfo_Controller.getGroundMarkerList)
//router.post('/ground/getGroundList' , groundInfo_Controller.getGroundList)
//router.post('/ground/getAllHistoryData' , groundInfo_Controller.getAllHistoryData)
// router.post('/ground/getSpecifiedElementList' , groundInfo_Controller.getSpecifiedElementList)

//echarts部分
router.get('/echarts/getAll' , echart_Controller.getAll)
router.post('/echarts/getGroundList' , echart_Controller.getGroundList)
router.post('/echarts/getSpecifiedElementList' , echart_Controller.getSpecifiedElementList)
// router.get('/echart/getAllPieData/:point_num' , echart_Controller.getAllPieData) //新加入的echart的数据路由
// router.get('/echart/getPieDataName/:point_num' , echart_Controller.getPieDataName)//只有数据名称的路由
router.get('/echarts/getRadarRealTimeValue/:point_num' , echart_Controller.getRadarRealTimeValue)
router.get('/echarts/getRadarData/:id' , echart_Controller.getRadarData)

//map部分
router.get('/data/getMarkerInfo' , mapController.getMarkerInfo) //1
router.get('/project/getMapPhByID/:project_num' , mapController.getMapPhByID)
router.get('/data/getpointMarkerInfo',mapController.getpointMarkerInfo) //3
router.get('/data/getGroundList/:project_num',mapController.getGroundList) //2
router.get('/data/ComputeCount',ComputeController.ComputeCount)
router.get('/data/ComputeAttention',ComputeController.ComputeAttention)
router.post('/data/AddData' , dataController.addTableData)
router.get('/data/getMoreDataByPointnum/:point_num',mapController.getMoreDataByPointnum)  //4
module.exports= router;