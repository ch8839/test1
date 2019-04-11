import request2 from '../utils/request2'

export function getMarkerInfo(){
    return request2.get('/data/getMarkerInfo')
}

export function getMapPhByID(ground_number){
    return request2.get('/project/getMapPhByID/'+ ground_number) 
    }