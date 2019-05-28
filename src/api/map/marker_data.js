import request2 from '../../utils/request2'

export function getMarkerInfo(){
    return request2.get('/data/getMarkerInfo')
}

export function getGroundList(project_num){
    
    return request2.get('/data/getGroundList/'+ project_num)   
}

export function getMoreDataByPointnum(point_num){
    
    return request2.get('/data/getMoreDataByPointnum/'+ point_num)
} 
export function getpointMarkerInfo(){
    return request2.get('/data/getpointMarkerInfo')
}

export function getCircleByProjectnum(project_num){
    
    return request2.get('/data/getCircleByProjectnum/'+ project_num)
} 