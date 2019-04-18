import request2 from '../utils/request2'

export function getGroundList(TableOptions){
    return request2.post('/ground/getGroundList', TableOptions)   
}

export function getMarkerList(ground_num){
    return request2.get('/ground/getMarkerList/' + ground_num)   
}

export function getAllHistoryData(HistoryTableOptions){
    return request2.post('/ground/getAllHistoryData', HistoryTableOptions)   
}

export function getSpecifiedElementList(selectedOptions){
    return request2.post('/ground/getSpecifiedElementList', selectedOptions)   
}
