import request2 from '../../utils/request2'

export function getMarkerInfo(){
    return request2.get('/data/getMarkerInfo')
}

export function getMapPhByID(project_num){
    console.log('project_num1', project_num)
    return request2.get('/data/getMapPhByID/'+ project_num)   
}

export function getMarkerList(project_num){
    console.log('project_num2', project_num)
    return request2.get('/data/getMarkerList/'+ project_num)
} 