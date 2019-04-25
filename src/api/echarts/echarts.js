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

export function getRadarRealTimeValue(point_num){
    console.log("Point_num 数据 in api", point_num)
    return request2.get('/echarts/getRadarRealTimeValue/' + point_num)   
}

export function getRadarData(id){
    return request2.get('/echarts/getRadarData/' + id)
}

/* 获取级联选择器 */
export function getCascader(){
    return request2.get('/project/getRawCascader')
}

export function getTableItemsByPN(project_num){
    return request2.get('/project/getTableItemsByPN/'+project_num)
}