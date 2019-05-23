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
const waterInfo_Controller = require('../controller/table/waterInfo.js')

//echarts模块
const echart_Controller_0 = require('../controller/echarts/echart_0.js')
const echart_Controller = require('../controller/echarts/echart.js')
const echart_ground_Controller = require('../controller/echarts/echart_ground.js')
const echart_water_Controller = require('../controller/echarts/echart_water.js')

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
router.get('/project/getProjectInfo' , projectInfo_Controller.getProjectInfo)
router.get('/project/getPointOptions/:project_num' , projectInfo_Controller.getPointOptions)
router.get('/project/getMarkerList/:project_num' , projectInfo_Controller.getMarkerList)

router.post('/ground/getLabGroundList' , groundInfo_Controller.getLabGroundList)
router.post('/ground/getDetGroundList' , groundInfo_Controller.getDetGroundList)
router.get('/ground/getLabGroundReference/:sample_num' , groundInfo_Controller.getLabGroundReference)

router.post('/water/getLabWaterList' , waterInfo_Controller.getLabWaterList)
router.post('/water/getDetWaterList' , waterInfo_Controller.getDetWaterList)
router.get('/water/getLabWaterReference/:sample_num' , waterInfo_Controller.getLabWaterReference)

//echart_0部分
router.get('/database/ComputeLabAttention',echart_Controller_0.ComputeLabAttention)
router.get('/database/ComputeLabWaterAttention',echart_Controller_0.ComputeLabWaterAttention)
router.get('/project/getRawCascader' , echart_Controller_0.getRawCascader) 
router.get('/project/getRawAssessData/:project_num' , echart_Controller_0.getRawAssessData) 
router.get('/project/getTableItemsByPN/:project_num' , echart_Controller_0.getTableItemsByPN) 
router.get('/project/getWaterTableItemsByPN/:project_num' , echart_Controller_0.getWaterTableItemsByPN) 
//其它echarts部分
router.post('/groundecharts/getHistogramData', echart_ground_Controller.getHistogramData)
router.post('/groundecharts/getRadarEachDepthValue', echart_ground_Controller.getRadarEachDepthValue)
router.post('/groundecharts/getRadarWaterEachDepthValue', echart_water_Controller.getRadarWaterEachDepthValue)
router.post('/groundecharts/getWaterHistogramData', echart_water_Controller.getWaterHistogramData)

//map部分
router.get('/data/getMarkerInfo' , mapController.getMarkerInfo) //1
router.get('/data/getpointMarkerInfo',mapController.getpointMarkerInfo) //3
router.get('/data/getGroundList/:project_num',mapController.getGroundList) //2
router.get('/data/ComputeCount',ComputeController.ComputeCount)
router.get('/data/ComputeAttention',ComputeController.ComputeAttention)
router.post('/data/AddData' , dataController.addTableData)
router.get('/data/getMoreDataByPointnum/:point_num',mapController.getMoreDataByPointnum)  //4
router.get('/data/getCircleByProjectnum/:project_num',mapController.getCircleByProjectnum) //5
module.exports= router;