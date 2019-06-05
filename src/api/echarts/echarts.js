import request2 from '../../utils/request2'

export function getAll(){
    return request2.get('/echarts/getAll')
}

/* echarts */
export function getHistogramData(params){
    // 获取barseries of ground
    return request2.post('/groundecharts/getHistogramData', params)
}
export function getWaterHistogramData(params){
    // 获取barseries of water
    return request2.post('/waterecharts/getWaterHistogramData', params)
}
export function getRadarEachDepthValue(params){
    // 获取radarseries of ground
    return request2.post('/groundecharts/getRadarEachDepthValue', params)
}
export function getRadarWaterEachDepthValue(params){
    // 获取radarseries of water
    return request2.post('/waterecharts/getRadarWaterEachDepthValue', params)
}
export function getAllFoldData(params){
    // 获取lineseries of ground
    return request2.post('/groundecharts/getAllFoldData', params)
}
export function getAllWaterFoldData(params){
    // 获取lineseries of water
    return request2.post('/waterecharts/getAllWaterFoldData', params)
}

/* echarts_0  */
export function getCascader(){
    return request2.get('/project/getProjectInfo')
}

export function getAssessData(project_num){
    // 获取类型选择器数据
    return request2.get('/project/getRawAssessData/'+project_num)
}
export function getTableItemsByPN(project_num){
    // 获取筛选后earth表格 
    return request2.get('/project/getTableItemsByPN/'+project_num)
}

export function getWaterTableItemsByPN(project_num){
    // 获取筛选后water表格 
    return request2.get('/project/getWaterTableItemsByPN/'+project_num)
}
