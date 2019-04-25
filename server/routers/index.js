const Router = require('koa-router')
const router = new Router()

//test模块
const userController = require('../controller/login/user.js')
const testController = require('../controller/test/test.js')

//table模块
const projectInfo_Controller = require('../controller/table/projectInfo.js')
const groundInfo_Controller = require('../controller/table/groundInfo.js')
const waterInfo_Controller = require('../controller/table/waterInfo.js')
//echarts模块
const echart_Controller = require('../controller/echarts/echart.js')

//map模块
const mapController = require('../controller/map/data.js')



//测试部分
router.get('/student/:id' , userController.getStudentInfo)
router.post('/user/login' , userController.login)
router.get('/user/info' , userController.getLoginInfo)

router.post('/table/getTableData' , testController.getTableData)
router.post('/table/updateTable' , testController.updateTable)
router.post('/table/deleteData' , testController.deleteTableData)
router.post('/table/addTableData' , testController.addTableData)

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

//echarts部分
router.get('/project/getRawCascader' , echart_Controller.getRawCascader) 
router.get('/project/getTableItemsByPN/:project_num' , echart_Controller.getTableItemsByPN) 

//map部分
router.get('/data/getMarkerInfo' , mapController.getMarkerInfo)
router.get('/data/getMapPhByID/:project_num' , mapController.getMapPhByID)

module.exports= router;