import request2 from '../utils/request2'

export function getGroundList(selectedOptions){
    return request2.post('/ground/getGroundList', selectedOptions)   
}
