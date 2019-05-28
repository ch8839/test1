const Router = require('koa-router')
const router = new Router()

//test模块
// const userController = require('../controller/login/user.js')
// const testController = require('../controller/test/test.js')

//table模块
// const projectInfo_Controller = require('../controller/table/projectInfo.js')
// const groundInfo_Controller = require('../controller/table/groundInfo.js')

// //echarts模块
const echart_Controller = require('../controller/echarts/echart_ground.js')
const statistic_value_Controller = require('../controller/echarts/statistic_ground_value.js')
const statistic_water_value_Controller = require('../controller/echarts/statistic_water_value.js')
const echart_water_Controller = require('../controller/echarts/echart_water.js')

// //map模块
// const mapController = require('../controller/map/data.js')



//测试部分
// router.get('/student/:id' , userController.getStudentInfo)
// router.post('/user/login' , userController.login)
// router.get('/user/info' , userController.getLoginInfo)

// router.post('/table/getTableData' , testController.getTableData)
// router.post('/table/updateTable' , testController.updateTable)
// router.post('/table/deleteData' , testController.deleteTableData)
// router.post('/table/addTableData' , testController.addTableData)

//table部分
// router.get('/project/getAll' , projectInfo_Controller.getAll)
// router.get('/ground/getMarkerList/:ground_num' , groundInfo_Controller.getGroundMarkerList)
// router.post('/ground/getGroundList' , groundInfo_Controller.getGroundList)
// router.post('/ground/getAllHistoryData' , groundInfo_Controller.getAllHistoryData)
// router.post('/ground/getSpecifiedElementList' , groundInfo_Controller.getSpecifiedElementList)

//echarts部分
router.post('/echarts/getRadarEachDepthValue' , echart_Controller.getRadarEachDepthValue)//雷达图中监测点位下不同深度的全部元素的数据

router.post('/echarts/getHistogramData', echart_Controller.getHistogramData)//(point_num, element)柱状图中相同监测点位下不同调查类型下数据并根据深度分开存放
router.post('/echarts/ComputeHistogramElementValue', statistic_value_Controller.ComputeHistogramElementValue)//计算每个元素的最大值
router.post('/echarts/ComputeRadarElementEachDepthValue', statistic_value_Controller.ComputeRadarElementEachDepthValue)//(point_num, element)柱状图中相同监测点位下不同调查类型下数据并根据深度分开存放
router.post('/echarts/ComputeWaterHistogramElementValue', statistic_water_value_Controller.ComputeWaterHistogramElementValue)//(point_n
router.post('/echarts/ComputeWaterRadarElementEachDepthValue', statistic_water_value_Controller.ComputeWaterRadarElementEachDepthValue)
router.post('/echarts/getWaterHistogramData', echart_water_Controller.getWaterHistogramData)
router.post('/echarts/getRadarWaterEachDepthValue' , echart_water_Controller.getRadarWaterEachDepthValue)
router.post('/echarts/getAllFoldData', echart_Controller.getAllFoldData)//得到土壤的监测点位下的样本信息的折线图
router.post('/echarts/getAllWaterFoldData', echart_water_Controller.getAllWaterFoldData)//得到水的监测点位下的样本信息的折线图
// router.post('/echarts/ComputeFoldElementStatisticValue', statistic_value_Controller.ComputeFoldElementStatisticValue)





//map部分
// router.get('/data/getMarkerInfo' , mapController.getMarkerInfo)
// router.get('/project/getMapPhByID/:ground_number' , mapController.getMapPhByID)
// router.get('/data/getMarkerList/:ground_number',mapController.getMarkerList)

module.exports= router;