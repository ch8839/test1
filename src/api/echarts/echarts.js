import request2 from '../../utils/request2'

export function getAll(){
    return request2.get('/echarts/getAll')
}

export function getGroundList(selectedOptions){
    return request2.post('/echarts/getGroundList', selectedOptions)   
}

export function getSpecifiedElementList(selectedOptions){
    return request2.post('/echarts/getSpecifiedElementList', selectedOptions)   
}

/* echarts */
export function getHistogramData(params){
    // 获取barseries 
    return request2.post('/echarts/getHistogramData', params)
}


/* echarts_0  */
export function getCascader(){
    // 获取级联选择器 
    return request2.get('/project/getRawCascader')
}
export function getAssessData(project_num){
    // 获取类型选择器数据
    return request2.get('/project/getRawAssessData/'+project_num)
}
export function getTableItemsByPN(project_num){
    // 获取筛选后表格 
    return request2.get('/project/getTableItemsByPN/'+project_num)
}

export function getRadarRealTimeValue(point_num){
    //获取雷达图 
    return request2.get('/radar/getRadarRealTimeValue/'+point_num)
}

export function getRadarData(reference_num){
    //获取雷达图 max & “17国标”
    return request2.get('/radar/getRadarData/'+reference_num)
}

export function getValidElementOfBar(params){
    //获取雷达图 max & “17国标”
    return request2.post('/bar/getValidElementOfBar',params)
}