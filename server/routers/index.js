const Router = require('koa-router')
const router = new Router()

//test模块
// const userController = require('../controller/user/user.js')
// const testController = require('../controller/test/test.js')
//登陆模块
const User_Controller = require('../controller/user/login.js')
//table模块
const projectInfo_Controller = require('../controller/table/projectInfo.js')
const groundInfo_Controller = require('../controller/table/groundInfo.js')

//echarts模块
const echart_Controller_0 = require('../controller/echarts/echart_0.js')
const echart_Controller = require('../controller/echarts/echart.js')

//map模块
const mapController = require('../controller/map/data.js')
const ComputeController = require('../controller/map/compute.js')
const dataController = require('../controller/map/adddata.js')


//测试部分
// router.post('/table/getTableData' , testController.getTableData)
// router.post('/table/updateTable' , testController.updateTable)
// router.post('/table/deleteData' , testController.deleteTableData)
// router.post('/table/addTableData' , testController.addTableData)

//user部分
router.post('/user2/login' , User_Controller.login)
router.get('/user2/info/:token' , User_Controller.getUserInfo)

//table部分
//router.get('/project/getAll' , projectInfo_Controller.getAll)
//router.get('/ground/getMarkerList/:ground_num' , groundInfo_Controller.getGroundMarkerList)
//router.post('/ground/getGroundList' , groundInfo_Controller.getGroundList)
//router.post('/ground/getAllHistoryData' , groundInfo_Controller.getAllHistoryData)
// router.post('/ground/getSpecifiedElementList' , groundInfo_Controller.getSpecifiedElementList)

//echarts部分
router.get('/project/getRawCascader' , echart_Controller_0.getRawCascader) 
router.get('/project/getRawAssessData/:project_num' , echart_Controller_0.getRawAssessData) 
router.get('/project/getTableItemsByPN/:project_num' , echart_Controller_0.getTableItemsByPN) 
router.post('/bar/getValidElementOfBar', echart_Controller_0.getValidElementOfBar) 
router.post('/echarts/getHistogramData', echart_Controller.getHistogramData)

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