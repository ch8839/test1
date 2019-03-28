import request2 from '../utils/request2'

export function getMarkerInfo(){
    return request2.get('/data/getMarkerInfo')
}
