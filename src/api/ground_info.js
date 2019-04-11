import request2 from '../utils/request2'

export function getGroundList(TableOptions){
    return request2.post('/ground/getGroundList', TableOptions)   
}

export function getAllHistoryData(point_num){
    return request2.get('/ground/getAllHistoryData/'+ point_num)   
}

export function getSpecifiedElementList(selectedOptions){
    return request2.post('/ground/getSpecifiedElementList', selectedOptions)   
}
