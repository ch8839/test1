import request2 from '../utils/request2'

export function getGroundList(selectedOptions){
    return request2.post('/ground/getGroundList', selectedOptions)   
}

export function getAllHistoryData(point_num){
    return request2.get('/ground/getAllHistoryData/'+ point_num)   
}
